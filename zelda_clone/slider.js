const RUN_SPEED = 5.5;

function Slider() {
  this.x = GAME_WIDTH / 2;
  this.y = GAME_HEIGHT / 2;
};

Slider.prototype.move = function(keyEvents, bricks) {
  var nextX = this.x;
  var nextY = this.y;

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
    this.x = nextX;
    this.y = nextY;
  }
};

Slider.prototype.draw = function(graphics) {
  graphics.colorCircle(this.x, this.y, 10, 'white');
};
