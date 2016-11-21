function Keyboard() {
  this.keyPressed = {};
};

Keyboard.prototype.keydown = function(evt) {
  if (document.activeElement.id === 'levelData.data') {
    return;
  }
  this.keyPressed[evt.keyCode] = true;
  evt.preventDefault(); // without this, arrow keys scroll the browser!
};

Keyboard.prototype.keyup = function(evt) {
  this.keyPressed[evt.keyCode] = false;
};

Keyboard.prototype.isKeyPressed = function(keyCode) {
  if (!(keyCode in this.keyPressed)) {
    this.keyPressed[keyCode] = false;
    return false;
  }
  return this.keyPressed[keyCode];
};
