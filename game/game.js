function Game() {
  this.fps = 30;
  this.width = 256;
  this.height = 240;
  this.scaleX = 2;
  this.scaleY = 2;
  this.isEditing = true;
  this.isEditorHidingBricks = false;
};

Game.prototype.loadWorld = function(world) {
  this.gridData = world.gridData;
  this.numCols = world.numCols;
  this.levelImage = getLevelImage(world.key);
  this.levelImageKey = world.key;
  this.levelImageOffset = world.levelImageOffset;
  this.reset();
};

Game.prototype.reset = function() {
  var gridBuilder = new GridBuilder(this.numCols, this.gridData);
  var grid = new Grid(gridBuilder);
  this.bricks = new Bricks(grid);
  this.player = new Player(this.width/2, this.height/2);
  this.playerCamera = new PlayerCamera(0, 0, this.width, this.height);
  this.editorCamera = new EditorCamera(0, 0, this.width, this.height);
};

Game.prototype.updateLevel = function() {
  var gridBuilder = new GridBuilder(this.numCols, this.gridData);
  var grid = new Grid(gridBuilder);
  this.bricks = new Bricks(grid);
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
    this.isEditorHidingBricks = !this.isEditorHidingBricks;
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
    this.bricks.toggleValueAtColRow(mouseCol, mouseRow);
    this.gridData = this.bricks.getGridData();
    displayLevelData();
  }

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.editorCamera.x, -this.editorCamera.y);
  if (levelImageLoaded[this.levelImageKey]) {
    graphics.drawImage(this.levelImage, -this.levelImageOffset, 0);
  }
  if (!this.isEditorHidingBricks) {
    this.bricks.drawBricksInRect(camera.x, camera.y, camera.width,
      camera.height, graphics);
  }
  graphics.popState();
  graphics.popState();

  graphics.fillText('Editor Mode', 5, 15, 'yellow');

  if (this.isEditorHidingBricks) {
    graphics.fillText('Press 0 to unhide bricks', 400, 15, 'yellow');
  }
  else {
    graphics.fillText('Press 0 to hide bricks', 400, 15, 'yellow');
  }

  var mouseColRowText = '(' + mouseCol + ', ' + mouseRow + ')';
  graphics.fillText(mouseColRowText, mouseX, mouseY, 'yellow');
};

Game.prototype.updatePlayerMode = function() {
  var keyboard = globals.keyboard;
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
  graphics.popState();
  graphics.popState();

  graphics.fillText('Player Mode', 5, 15, 'yellow');
};
