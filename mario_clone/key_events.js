var holdLeft = false;
var holdRight = false;
var holdJump = false;

function KeyEvents() {
};

KeyEvents.prototype.setKeyHoldState = function(thisKey, setTo) {
  if(thisKey == KEY_LEFT_ARROW) {
    holdLeft = setTo;
  }
  if(thisKey == KEY_RIGHT_ARROW) {
    holdRight = setTo;
  }
  if(thisKey == KEY_UP_ARROW || thisKey == KEY_SPACE) {
    holdJump = setTo;
  }
};
