function Keyboard(keyEvents) {
  this.keyEvents = keyEvents;
};

Keyboard.prototype.keydown = function(evt) {
  this.keyEvents.setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
};

Keyboard.prototype.keyup = function(evt) {
  this.keyEvents.setKeyHoldState(evt.keyCode, false);
};
