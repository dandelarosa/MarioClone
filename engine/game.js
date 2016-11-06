function Game(services, keyEvents, mouse, firstLevel) {
  this.services = services;
  this.keyEvents = keyEvents;
  this.mouse = mouse;
  this.currentLevel = firstLevel;
};

Game.prototype.FRAMES_PER_SECOND = 30;

Game.prototype.update = function() {
  var graphics = this.services.graphics;
  var mouse = this.services.mouse;
  this.currentLevel.update(this.keyEvents, mouse);
  this.currentLevel.draw(graphics);
};
