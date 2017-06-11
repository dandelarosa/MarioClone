function EditorMode() {
  // Should find a better way to assign these
  this.scaleX = 2;
  this.scaleY = 2;
  this.width = 256;
  this.height = 240;
  this.levelMockupAlpha = 0.0;

  this.tileEditingMode = new TileEditingMode();
  this.obstacleEditingMode = new ObstacleEditingMode();
  var savedEditingMode = persistence.getValue('editingMode', 'int', EDITING_MODE.TILES);
  if (savedEditingMode === EDITING_MODE.OBSTACLES) {
    this.currentEditingMode = this.obstacleEditingMode;
  }
  else {
    this.currentEditingMode = this.tileEditingMode;
  }
}

EditorMode.prototype = (function() {
  return {
    draw: draw,
    loadWorld: loadWorld,
    update: update,
  };

  function loadWorld(world) {
    this.gridData = world.gridData;
    this.numCols = world.numCols;
    this.tilesetName = world.tilesetName;
    this.levelImage = getLevelImage(world.key);
    this.levelImageKey = world.key;
    this.levelImageOffset = world.levelImageOffset;
    this.obstacles = world.obstacles;
    // Not sure of the best place to put this
    if (!this.obstacles || this.obstacles.length === 0) {
      var newObstacles = [];
      for (var i = 0; i < this.gridData.length; i++) {
        newObstacles.push(OBSTACLE_EMPTY);
      }
      this.obstacles = newObstacles;
    }

    var tileData = new Grid2D(this.gridData, this.numCols);
    var tileset = new Tileset(this.tilesetName);
    this.tiles = new TileGrid(tileData, tileset);
    this.camera = new EditorCamera(0, 0, this.width, this.height);
    var obstacleData = new Grid2D(this.obstacles, this.numCols);
    this.obstacleGrid = new ObstacleGrid(obstacleData);
  }

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
      if (this.currentEditingMode == this.tileEditingMode) {
        this.currentEditingMode = this.obstacleEditingMode;
        persistence.setValue('editingMode', EDITING_MODE.OBSTACLES);
      }
      else {
        this.currentEditingMode = this.tileEditingMode;
        persistence.setValue('editingMode', EDITING_MODE.TILES);
      }
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
      camera.height, graphics);
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
