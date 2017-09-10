function EditorMode() {
  // Should find a better way to assign these
  this.scaleX = 2;
  this.scaleY = 2;
  this.width = 256;
  this.height = 240;
  this.levelMockupAlpha = 0.0;

  var savedEditingModeIndex = persistence.getValue('editingMode', 'int', EDITING_MODE.FIRST);
  if (savedEditingModeIndex > EDITING_MODE.LAST) {
    savedEditingModeIndex = EDITING_MODE.FIRST;
  }
  this.editingModeIndex = savedEditingModeIndex;
  this.editingModeManager = new EditingModeManager();
  this.currentEditingMode = this.editingModeManager.modeForIndex(this.editingModeIndex);

  this.editorMouse = new EditorMouse();
}

EditorMode.prototype = (function() {
  return {
    addColumns: addColumns,
    changeEditingModeIndex: changeEditingModeIndex,
    deleteLastColumn: deleteLastColumn,
    draw: draw,
    loadLevel: loadLevel,
    update: update,
  };

  /**
   * Loads a level.
   * @param {Object} level - The level to load.
   */
  function loadLevel(level) {
    this.level = level;
    var backgroundTiles = level.backgroundTiles;
    var foregroundTiles = level.foregroundTiles;
    var enemyGrid = level.enemyGrid;
    this.camera = new EditorCamera(0, 0, this.width, this.height);

    this.levelImage = getLevelImage(level.key);
    this.levelImageKey = level.key;
    this.levelImageOffset = level.levelImageOffset;

    this.allGrids = new AllGrids({
      backgroundTiles: backgroundTiles,
      foregroundTiles: foregroundTiles,
      enemyGrid: enemyGrid,
      tileset: level.tileset,
      shoudDrawEnemyTiles: true,
    });

    this.collisionDetectors = {
      level: new LevelCollisionDetector(foregroundTiles),
    };
  }

  // Editing

  /**
   * Adds columns to the right side of the grid.
   * @param {number} colsToAdd - The number of columns to add.
   */
  function addColumns(colsToAdd) {
    var oldNumCols = this.allGrids.backgroundTiles.numCols;
    var newNumCols = oldNumCols + colsToAdd;

    var oldBackgroundTilesData = this.allGrids.backgroundTiles.getData();
    var backgroundTiles2D = create2dArray(oldBackgroundTilesData, oldNumCols);
    addColumnsToGrid(backgroundTiles2D, colsToAdd, 0);
    var newBackgroundTilesData = create1dArray(backgroundTiles2D);
    this.allGrids.backgroundTiles = new Grid2D(newBackgroundTilesData, newNumCols);

    var oldForegroundTilesData = this.allGrids.foregroundTiles.getData();
    var foregroundTiles2D = create2dArray(oldForegroundTilesData, oldNumCols);
    addColumnsToGrid(foregroundTiles2D, colsToAdd, 0);
    var newForegroundTilesData = create1dArray(foregroundTiles2D);
    this.allGrids.foregroundTiles = new Grid2D(newForegroundTilesData, newNumCols);

    var oldEnemyData = this.allGrids.enemyGrid.getData();
    var enemies2D = create2dArray(oldEnemyData, oldNumCols);
    addColumnsToGrid(enemies2D, colsToAdd, 0);
    var newEnemies = create1dArray(enemies2D);
    this.allGrids.enemyGrid = new Grid2D(newEnemies, newNumCols);

    this.collisionDetectors.level.updateWithGrid(this.allGrids.backgroundTiles);
  }

  /**
   * Deletes the last column.
   */
  function deleteLastColumn() {
    var oldNumCols = this.allGrids.backgroundTiles.numCols;
    var newNumCols = oldNumCols - 1;

    var oldBackgroundTilesData = this.allGrids.backgroundTiles.getData();
    var backgroundTiles2D = create2dArray(oldBackgroundTilesData, oldNumCols);
    removeLastColumnFromGrid(backgroundTiles2D);
    var newBackgroundTilesData = create1dArray(backgroundTiles2D);
    this.allGrids.backgroundTiles = new Grid2D(newBackgroundTilesData, newNumCols);

    var oldForegroundTilesData = this.allGrids.foregroundTiles.getData();
    var foregroundTiles2D = create2dArray(oldForegroundTilesData, oldNumCols);
    removeLastColumnFromGrid(foregroundTiles2D);
    var newForegroundTilesData = create1dArray(foregroundTiles2D);
    this.allGrids.foregroundTiles = new Grid2D(newForegroundTilesData, newNumCols);

    var oldEnemyData = this.allGrids.enemyGrid.getData();
    var enemies2D = create2dArray(oldEnemyData, oldNumCols);
    removeLastColumnFromGrid(enemies2D);
    var newEnemies = create1dArray(enemies2D);
    this.allGrids.enemyGrid = new Grid2D(newEnemies, newNumCols);

    this.collisionDetectors.level.updateWithGrid(this.allGrids.backgroundTiles);
  }

  // Run Loop

  function update() {
    var keyboard = globals.keyboard;

    if (keyboard.isKeyPressedThisFrame(KEY_0)) {
      if (this.levelMockupAlpha === 0.0) {
        this.levelMockupAlpha = 0.5;
      }
      else {
        this.levelMockupAlpha = 0.0;
      }
    }

    if (keyboard.isKeyPressedThisFrame(KEY_1)) {
      if (this.editingModeIndex >= EDITING_MODE.LAST) {
        this.changeEditingModeIndex(EDITING_MODE.FIRST);
      }
      else {
        this.changeEditingModeIndex(this.editingModeIndex + 1);
      }
    }

    var camera = this.camera;
    this.camera.update(keyboard, this.collisionDetectors);

    var mouse = globals.mouse;
    if (mouse.x !== undefined && mouse.y !== undefined) {
      // Use the canvas' coordinate system
      var graphicalMouseX = mouse.x;
      var graphicalMouseY = mouse.y;
      // Logical coordinates (relative to canvas)
      var logicalMouseX = graphicalMouseX / 2;
      var logicalMouseY = graphicalMouseY / 2;
      // Logical coordinates (relative to level)
      var levelMouseX = logicalMouseX + camera.getRect().x;
      var levelMouseY = logicalMouseY + camera.getRect().y;

      this.editorMouse.x = levelMouseX;
      this.editorMouse.y = levelMouseY;

      var mouseCol = Math.floor(levelMouseX / TILE_WIDTH);
      var mouseRow = Math.floor(levelMouseY / TILE_HEIGHT);

      var editingMode = this.currentEditingMode;
      if (mouse.isPressedThisFrame()) {
        editingMode.handleClickAtColRow(mouseCol, mouseRow, this);
      }
      this.editorMouse.col = mouseCol;
      this.editorMouse.row = mouseRow;
      var mouseValue = editingMode.valueAtColRow(mouseCol, mouseRow, this);
      this.editorMouse.value = mouseValue;
    }
  }

  /**
   * Changes the editing mode index. Use this method for switching editing modes.
   * @param {number} index - The new editing mode index.
   */
  function changeEditingModeIndex(index) {
    this.editingModeIndex = index;
    this.currentEditingMode = this.editingModeManager.modeForIndex(this.editingModeIndex);
    persistence.setValue('editingMode', this.editingModeIndex);
    showGridDetailUIForIndex(this.editingModeIndex);
  }

  function draw() {
    var graphics = globals.graphics;
    graphics.pushState();
    graphics.scale(this.scaleX, this.scaleY);
    graphics.fillCanvas('black');

    graphics.pushState();
    var camera = this.camera;
    var cameraRect = camera.getRect();
    graphics.translate(-cameraRect.x, -cameraRect.y);
    this.allGrids.drawWithGraphicsInRect(graphics, cameraRect);
    if (levelImageLoaded[this.levelImageKey]) {
      graphics.drawImageWithAlpha(this.levelImage, -this.levelImageOffset, 0,
        this.levelMockupAlpha);
    }
    this.editorMouse.draw(graphics);
    graphics.popState();
    graphics.popState();

    graphics.fillText('Editor Mode', 5, 15, 'yellow');
    graphics.fillText(this.currentEditingMode.displayText, 5, 25, 'yellow');

    graphics.fillText('Press 0 to toggle level mockup', 370, 25, 'yellow');
  }
})();
