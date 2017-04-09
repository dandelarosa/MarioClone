function Game() {
  this.fps = 30;
  this.width = 256;
  this.height = 240;
  this.scaleX = 2;
  this.scaleY = 2;
  this.isEditing = false;
  this.levelMockupAlpha = 0.0;
  this.selectedTileValue = TILE_BLUE_SKY;

  this.drawCameraDebugger = drawCameraDebugger;
  this.isDebuggingCamera = false;

  // Drawing

  function drawCameraDebugger(graphics) {
    var camera = this.playerCamera;
    var leftThreshold = camera.x + camera.leftSnapThreshold;
    graphics.drawLine(leftThreshold, 0, leftThreshold, this.height, 'black');
    var rightThreshold = camera.x + camera.rightSnapThreshold;
    graphics.drawLine(rightThreshold, 0, rightThreshold, this.height, 'black');
  }
};

Game.prototype.loadWorld = function(world) {
  this.gridData = world.gridData;
  this.numCols = world.numCols;
  this.tilesetName = world.tilesetName;
  this.levelImage = getLevelImage(world.key);
  this.levelImageKey = world.key;
  this.levelImageOffset = world.levelImageOffset;
  this.reset();
};

Game.prototype.reset = function() {
  var grid = new Grid2D(this.gridData, this.numCols);
  var tileset = new Tileset(this.tilesetName);
  this.bricks = new Bricks(grid, tileset);
  this.player = new Player(this.width/2, this.height/2);
  this.playerCamera = new PlayerCamera(0, 0, this.width, this.height);
  this.editorCamera = new EditorCamera(0, 0, this.width, this.height);
};

Game.prototype.updateLevel = function() {
  var grid = new Grid2D(this.gridData, this.numCols);
  var tileset = new Tileset(this.tilesetName);
  this.bricks = new Bricks(grid, tileset);
};

Game.prototype.switchToEditorMode = function() {
  this.isEditing = true;
};

Game.prototype.switchToPlayerMode = function() {
  this.isEditing = false;
};

Game.prototype.update = function() {
  var keyboard = globals.keyboard;
  var mouse = globals.mouse;
  if (keyboard.isKeyPressedThisFrame(KEY_ESC)) {
    if (this.isEditing) {
      this.switchToPlayerMode();
    }
    else {
      this.switchToEditorMode();
    }
  }

  if (this.isEditing) {
    this.updateEditorMode();
  }
  else {
    this.updatePlayerMode();
  }

  keyboard.resetKeyStateChanges();
  mouse.resetStateChange();
};

Game.prototype.updateEditorMode = function() {
  var keyboard = globals.keyboard;

  if (keyboard.isKeyPressedThisFrame(KEY_0)) {
    if (this.levelMockupAlpha === 0.0) {
      this.levelMockupAlpha = 0.5;
    }
    else {
      this.levelMockupAlpha = 0.0;
    }
  }

  var camera = this.editorCamera;
  this.editorCamera.update(keyboard, this.bricks);

  var mouse = globals.mouse;
  var mouseX = mouse.x;
  var mouseY = mouse.y;
  var mousePlusCameraX = mouse.x / 2 + camera.x;
  var mousePlusCameraY = mouse.y / 2 + camera.y;
  var mouseCol = this.bricks.colForPixelX(mousePlusCameraX);
  var mouseRow = this.bricks.rowForPixelY(mousePlusCameraY);
  if (mouse.isPressedThisFrame()) {
    this.bricks.toggleValueAtColRow(mouseCol, mouseRow, this.selectedTileValue);
    this.gridData = this.bricks.getGridData();
    displayLevelData();
  }

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.editorCamera.x, -this.editorCamera.y);
  this.bricks.drawBricksInRect(camera.x, camera.y, camera.width,
    camera.height, graphics);
  if (levelImageLoaded[this.levelImageKey]) {
    graphics.drawImageWithAlpha(this.levelImage, -this.levelImageOffset, 0,
      this.levelMockupAlpha);
  }
  graphics.popState();
  graphics.popState();

  graphics.fillText('Editor Mode', 5, 15, 'yellow');

  graphics.fillText('Press 0 to toggle level mockup', 370, 15, 'yellow');

  var mouseColRowText = '(' + mouseCol + ', ' + mouseRow + ')';
  graphics.fillText(mouseColRowText, mouseX + 5, mouseY, 'yellow');

  var value = this.bricks.tileValueAtColRow(mouseCol, mouseRow);
  graphics.fillText(twoDigitHexString(value), mouseX + 15, mouseY + 15, 'yellow');
};

Game.prototype.updatePlayerMode = function() {
  var keyboard = globals.keyboard;
  if (keyboard.isKeyPressedThisFrame(KEY_1)) {
    this.isDebuggingCamera = !this.isDebuggingCamera;
    persistence.setValue('isDebuggingCamera', this.isDebuggingCamera);
  }

  this.player.move(keyboard, this.bricks);

  var camera = this.playerCamera;
  camera.follow(this.player, this.bricks);

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.playerCamera.x, -this.playerCamera.y);
  this.bricks.drawBricksInRect(camera.x, camera.y, camera.width,
    camera.height, graphics);
  this.player.draw(graphics);
  if (this.isDebuggingCamera) {
    this.drawCameraDebugger(graphics);
  }
  graphics.popState();
  graphics.popState();

  graphics.fillText('Player Mode', 5, 15, 'yellow');
};
