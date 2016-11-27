function Keyboard() {
  this.keyPressed = {};
  this.keyStateChanged = {};
};

Keyboard.prototype.keydown = function(evt) {
  if (document.activeElement.id === 'levelData.data') {
    return;
  }
  // Don't count as a state change if the key is already down
  if (!this.keyPressed[evt.keyCode]) {
    this.keyStateChanged[evt.keyCode] = true;
  }
  this.keyPressed[evt.keyCode] = true;
  evt.preventDefault(); // without this, arrow keys scroll the browser!
};

Keyboard.prototype.keyup = function(evt) {
  // Don't count as a state change if the key is already up
  if (this.keyPressed[evt.keyCode]) {
    this.keyStateChanged[evt.keyCode] = true;
  }
  this.keyPressed[evt.keyCode] = false;
};

Keyboard.prototype.isKeyPressed = function(keyCode) {
  if (!(keyCode in this.keyPressed)) {
    this.keyPressed[keyCode] = false;
    return false;
  }
  return this.keyPressed[keyCode];
};

Keyboard.prototype.isKeyPressedThisFrame = function(keyCode) {
  return this.keyStateChanged[keyCode] && this.keyPressed[keyCode];
};

// Should call at the end of the update function
Keyboard.prototype.resetKeyStateChanges = function() {
  this.keyStateChanged = {};
};
