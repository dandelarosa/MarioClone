function Game() {
  this.fps = 30;
  this.width = 256;
  this.height = 240;
  this.scaleX = 2;
  this.scaleY = 2;
  this.gridData = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1,
    1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  this.isEditing = true;
  this.reset();
};

Game.prototype.reset = function() {
  var gridBuilder = {
    cellWidth: 16,
    cellHeight: 16,
    data: this.gridData,
    numCols: 20,
    numRows: 15,
  };
  var grid = new Grid(gridBuilder);
  this.bricks = new Bricks(grid);
  this.camera = new Camera(0, 0, this.width, this.height);
}

Game.prototype.update = function() {
  var keyboard = globals.keyboard;
  if (keyboard.isKeyPressedThisFrame(KEY_ESC)) {
    this.isEditing = !this.isEditing;
  }

  this.camera.update(keyboard, this.bricks);

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.camera.x, -this.camera.y);
  this.bricks.drawAll(graphics);
  graphics.popState();
  graphics.popState();

  if (this.isEditing) {
    graphics.fillText('Editor Mode', 5, 15, 'yellow');

  }
  else {
    graphics.fillText('Player Mode', 5, 15, 'yellow');
  }

  keyboard.resetKeyStateChanges();
};
