var game = new Game();

function Game() {
  this.fps = 30;
};

Game.prototype.update = function() {
  var graphics = globals.graphics;
  graphics.fillCanvas('black');
};
