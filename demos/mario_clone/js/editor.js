function Editor() {
  this.bricks = new CustomBricks();
  this.camera = new EditorCamera();
  this.camera.width = GAME_WIDTH;
  this.camera.height = GAME_HEIGHT;
  this.bounds = {
    minX: 0,
    minY: 0,
    maxX: BRICK_W * BRICK_COLS,
    maxY: BRICK_H * BRICK_ROWS
  };
};

Editor.prototype.update = function(services) {
  var keyboard = services.keyboard;
  this.camera.update(keyboard, this.bounds);

  this.draw(services);
};

Editor.prototype.draw = function(services) {
  var graphics = services.graphics;
  graphics.fillWholeScreen('black');

  var bricks = this.bricks;
  var camera = this.camera;
  graphics.drawInCamera(this.camera.x, this.camera.y, function() {
    bricks.draw(graphics, camera);
  });

  graphics.colorText("Arrow keys to run, spacebar to jump", 8, 14, "white");
};
