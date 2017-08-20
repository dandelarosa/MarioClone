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
    // TODO: deprecate TileGrid class
    this.tiles = new TileGrid(foregroundTiles, level.tileset);
    this.camera = new EditorCamera(0, 0, this.width, this.height);

    // For Editor. Can reorganize?
    this.numCols = this.tiles.getNumCols();
    this.gridData = this.tiles.getGridData();

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
    var oldNumCols = this.numCols;
    var newNumCols = oldNumCols + colsToAdd;

    var oldTileData = this.tiles.getGridData();
    tiles2D = create2dArray(oldTileData, oldNumCols);
    addColumnsToGrid(tiles2D, colsToAdd, 0);
    var newTiles = create1dArray(tiles2D);
    var newTileGrid = new Grid2D(newTiles, newNumCols);
    this.tiles = new TileGrid(newTileGrid, this.level.tileset);

    var oldEnemyData = this.allGrids.enemyGrid.getData();
    enemies2D = create2dArray(oldEnemyData, oldNumCols);
    addColumnsToGrid(enemies2D, colsToAdd, 0);
    var newEnemies = create1dArray(enemies2D);
    this.allGrids.enemyGrid = new Grid2D(newEnemies, newNumCols);

    // For Editor. Can reorganize?
    this.numCols = newNumCols;
    this.gridData = this.tiles.getGridData();
  }

  /**
   * Deletes the last column.
   */
  function deleteLastColumn() {
    var oldNumCols = this.numCols;
    var newNumCols = oldNumCols - 1;

    var oldTileData = this.tiles.getGridData();
    tiles2D = create2dArray(oldTileData, oldNumCols);
    removeLastColumnFromGrid(tiles2D);
    var newTiles = create1dArray(tiles2D);
    var newTileGrid = new Grid2D(newTiles, newNumCols);
    this.tiles = new TileGrid(newTileGrid, this.level.tileset);

    var oldEnemyData = this.allGrids.enemyGrid.getData();
    enemies2D = create2dArray(oldEnemyData, oldNumCols);
    removeLastColumnFromGrid(enemies2D);
    var newEnemies = create1dArray(enemies2D);
    this.allGrids.enemyGrid = new Grid2D(newEnemies, newNumCols);

    // For Editor. Can reorganize?
    this.numCols = newNumCols;
    this.gridData = this.tiles.getGridData();
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
      this.editingModeIndex++;
      if (this.editingModeIndex > EDITING_MODE.LAST) {
        this.editingModeIndex = EDITING_MODE.FIRST;
      }
      this.currentEditingMode = this.editingModeManager.modeForIndex(this.editingModeIndex);
      persistence.setValue('editingMode', this.editingModeIndex);
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
