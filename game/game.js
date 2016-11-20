function Game() {
  this.fps = 30;
  this.width = 256;
  this.height = 240;
  this.scaleX = 2;
  this.scaleY = 2;
  this.bricks = new Bricks();
  this.camera = new Camera(0, 0, this.width, this.height);
};

Game.prototype.update = function() {
  this.camera.update(globals.keyboard, this.bricks);

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.camera.x, -this.camera.y);
  this.bricks.drawAll(graphics);
  graphics.popState();
  graphics.popState();
};
