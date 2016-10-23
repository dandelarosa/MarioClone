const RUN_SPEED = 5.5;

function Slider() {
  sliderX = GAME_WIDTH / 2;
  sliderY = GAME_HEIGHT / 2;
};

Slider.prototype.move = function(keyEvents, bricks) {
  var nextX = sliderX;
  var nextY = sliderY;

  if (keyEvents.holdLeft) {
    nextX += -RUN_SPEED;
  }
  if (keyEvents.holdRight) {
    nextX += RUN_SPEED;
  }
  if (keyEvents.holdUp) {
    nextY += -RUN_SPEED;
  }
  if (keyEvents.holdDown) {
    nextY += RUN_SPEED;
  }

  if (bricks.isBrickAtPixelCoord(nextX,nextY) == false) {
    sliderX = nextX;
    sliderY = nextY;
  }
};
