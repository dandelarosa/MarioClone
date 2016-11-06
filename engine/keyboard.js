function Keyboard(keyEvents) {
  this.keyEvents = keyEvents;
  this.keyPressed = {};
};

Keyboard.prototype.keydown = function(evt) {
  this.keyEvents.setKeyHoldState(evt.keyCode, true);
  this.keyPressed[evt.keyCode] = true;
  evt.preventDefault(); // without this, arrow keys scroll the browser!
};

Keyboard.prototype.keyup = function(evt) {
  this.keyEvents.setKeyHoldState(evt.keyCode, false);
  this.keyPressed[evt.keyCode] = false;
};

Keyboard.prototype.isKeyPressed = function(keyCode) {
  if (!(keyCode in this.keyPressed)) {
    this.keyPressed[keyCode] = false;
    return false;
  }
  return this.keyPressed[keyCode];
};
