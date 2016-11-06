function Game(services, firstLevel) {
  this.services = services;
  this.currentLevel = firstLevel;
};

Game.prototype.FRAMES_PER_SECOND = 30;

Game.prototype.update = function() {
  var graphics = this.services.graphics;
  var keyboard = this.services.keyboard;
  var mouse = this.services.mouse;

  // Should eventually use the Keyboard object instead of KeyEvents
  var keyEvents = keyboard.keyEvents;
  this.currentLevel.update(keyEvents, mouse);
  this.currentLevel.draw(graphics);
};
