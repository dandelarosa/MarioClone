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
    this.tiles = new TileGrid(level.tileGrid, level.tileset);
    this.enemyGrid = level.enemyGrid.copy();
    // TODO: rename to something more appropriate
    this.obstacleGrid = new ObstacleGrid();
    this.camera = new EditorCamera(0, 0, this.width, this.height);

    // For Editor. Can reorganize?
    this.numCols = this.tiles.getNumCols();
    this.gridData = this.tiles.getGridData();

    this.levelImage = getLevelImage(level.key);
    this.levelImageKey = level.key;
    this.levelImageOffset = level.levelImageOffset;
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

    var oldEnemyData = this.enemyGrid.getData();
    enemies2D = create2dArray(oldEnemyData, oldNumCols);
    addColumnsToGrid(enemies2D, colsToAdd, 0);
    var newEnemies = create1dArray(enemies2D);
    this.enemyGrid = new Grid2D(newEnemies, newNumCols);

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

    var oldEnemyData = this.enemyGrid.getData();
    enemies2D = create2dArray(oldEnemyData, oldNumCols);
    removeLastColumnFromGrid(enemies2D);
    var newEnemies = create1dArray(enemies2D);
    this.enemyGrid = new Grid2D(newEnemies, newNumCols);

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
      if (this.editingModeIndex >= EDITING_MODE.COUNT) {
        this.editingModeIndex = EDITING_MODE.FIRST;
      }
      this.currentEditingMode = this.editingModeManager.modeForIndex(this.editingModeIndex);
      persistence.setValue('editingMode', this.editingModeIndex);
    }

    var camera = this.camera;
    this.camera.update(keyboard, this.tiles);

    var mouse = globals.mouse;
    var mouseX = mouse.x;
    var mouseY = mouse.y;
    var mousePlusCameraX = mouse.x / 2 + camera.x;
    var mousePlusCameraY = mouse.y / 2 + camera.y;
    var mouseCol = this.tiles.colForPixelX(mousePlusCameraX);
    var mouseRow = this.tiles.rowForPixelY(mousePlusCameraY);
    if (mouse.isPressedThisFrame()) {
      this.currentEditingMode.handleClickAtColRow(mouseCol, mouseRow, this);
    }
  }

  function draw() {
    var graphics = globals.graphics;
    graphics.pushState();
    graphics.scale(this.scaleX, this.scaleY);
    graphics.fillCanvas('black');

    graphics.pushState();
    var camera = this.camera;
    graphics.translate(-this.camera.x, -this.camera.y);
    this.tiles.drawInRect(camera.x, camera.y, camera.width,
      camera.height, graphics);
    this.obstacleGrid.draw(camera.x, camera.y, camera.width,
      camera.height, graphics, this.enemyGrid);
    if (levelImageLoaded[this.levelImageKey]) {
      graphics.drawImageWithAlpha(this.levelImage, -this.levelImageOffset, 0,
        this.levelMockupAlpha);
    }
    graphics.popState();
    graphics.popState();

    graphics.fillText('Editor Mode', 5, 15, 'yellow');
    graphics.fillText(this.currentEditingMode.displayText, 5, 25, 'yellow');

    graphics.fillText('Press 0 to toggle level mockup', 370, 15, 'yellow');

    var mouse = globals.mouse;
    var mouseX = mouse.x;
    var mouseY = mouse.y;
    var mousePlusCameraX = mouse.x / 2 + camera.x;
    var mousePlusCameraY = mouse.y / 2 + camera.y;
    var mouseCol = this.tiles.colForPixelX(mousePlusCameraX);
    var mouseRow = this.tiles.rowForPixelY(mousePlusCameraY);
    var mouseColRowText = '(' + mouseCol + ', ' + mouseRow + ')';
    graphics.fillText(mouseColRowText, mouseX + 5, mouseY, 'yellow');

    var value = this.tiles.tileValueAtColRow(mouseCol, mouseRow);
    if (typeof value === 'number') {
      var displayValue = twoDigitHexString(value);
      graphics.fillText(displayValue, mouseX + 15, mouseY + 15, 'yellow');
    }
  }
})();
