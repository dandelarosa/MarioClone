function Game() {
  this.fps = 30;
  this.width = 256;
  this.height = 240;
  this.scaleX = 2;
  this.scaleY = 2;
  this.gridData = WORLD_11_GRID_DATA;
  this.numCols = WORLD_11_NUM_COLS;
  this.isEditing = true;
  this.reset();
};

Game.prototype.reset = function() {
  var gridBuilder = {
    cellWidth: 16,
    cellHeight: 16,
    data: this.gridData,
    numCols: this.numCols,
    numRows: 15,
  };
  var grid = new Grid(gridBuilder);
  this.bricks = new Bricks(grid);
  this.player = new Player(this.width/2, this.height/2);
  this.playerCamera = new PlayerCamera(0, 0, this.width, this.height);
  this.editorCamera = new EditorCamera(0, 0, this.width, this.height);
}

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
  }

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.editorCamera.x, -this.editorCamera.y);
  if (levelImageLoaded['world_1-1']) {
    graphics.context2d.drawImage(world11image, 0, 0);
  }
  this.bricks.drawAll(graphics);
  graphics.popState();
  graphics.popState();

  graphics.fillText('Editor Mode', 5, 15, 'yellow');

  var mouseColRowText = '(' + mouseCol + ', ' + mouseRow + ')';
  graphics.fillText(mouseColRowText, mouseX, mouseY, 'yellow');
};

Game.prototype.updatePlayerMode = function() {
  var keyboard = globals.keyboard;
  this.player.move(keyboard, this.bricks);
  this.playerCamera.follow(this.player, this.bricks);

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.playerCamera.x, -this.playerCamera.y);
  this.bricks.drawAll(graphics);
  this.player.draw(graphics);
  graphics.popState();
  graphics.popState();

  graphics.fillText('Player Mode', 5, 15, 'yellow');
};
