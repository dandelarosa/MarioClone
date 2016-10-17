function Game(graphics, firstLevel) {
  this.graphics = graphics;
  this.currentLevel = firstLevel;
};

Game.prototype.FRAMES_PER_SECOND = 30;

Game.prototype.perFrame = function() {
  this.update();
  this.draw();
}

Game.prototype.update = function() {
  this.currentLevel.update();
};

Game.prototype.draw = function() {
  this.currentLevel.draw(this.graphics);
}
