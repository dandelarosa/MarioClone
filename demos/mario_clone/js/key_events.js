function KeyEvents() {
  this.holdLeft = false;
  this.holdRight = false;
  this.holdJump = false;
};

KeyEvents.prototype.setKeyHoldState = function(thisKey, setTo) {
  if (thisKey == KEY_LEFT_ARROW) {
    this.holdLeft = setTo;
  }
  if (thisKey == KEY_RIGHT_ARROW) {
    this.holdRight = setTo;
  }
  if (thisKey == KEY_UP_ARROW || thisKey == KEY_SPACE) {
    this.holdJump = setTo;
  }
};
