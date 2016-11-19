function Game() {
  this.fps = 30;
  this.bricks = new Bricks();
  var cameraWidth = globals.graphics.canvas.width;
  var cameraHeight = globals.graphics.canvas.height;
  this.camera = new Camera(0, 0, cameraWidth, cameraHeight);
};

Game.prototype.update = function() {
  this.camera.update(globals.keyboard, this.bricks);

  var graphics = globals.graphics;
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.camera.x, -this.camera.y);
  this.bricks.drawAll(graphics);
  graphics.popState();
};
