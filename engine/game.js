function Game(services, firstLevel) {
  this.services = services;
  this.currentLevel = firstLevel;
};

Game.prototype.FRAMES_PER_SECOND = 30;

Game.prototype.update = function() {
  var services = this.services;
  this.currentLevel.update(services);
};
