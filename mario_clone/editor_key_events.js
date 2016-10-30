function KeyEvents() {
  this.holdLeft = false;
  this.holdRight = false;
  this.holdUp = false;
  this.holdDown = false;
};

KeyEvents.prototype.setKeyHoldState = function(thisKey, setTo) {
  if (thisKey == KEY_LEFT_ARROW) {
    this.holdLeft = setTo;
  }
  if (thisKey == KEY_RIGHT_ARROW) {
    this.holdRight = setTo;
  }
  if (thisKey == KEY_UP_ARROW) {
    this.holdUp = setTo;
  }
  if (thisKey == KEY_DOWN_ARROW) {
    this.holdDown = setTo;
  }
};
