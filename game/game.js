var game = new Game();

function Game() {
  this.fps = 30;
  this.bricks = new Bricks();
};

Game.prototype.update = function() {
  var graphics = globals.graphics;
  graphics.fillCanvas('black');

  this.bricks.drawAll(graphics);
};
