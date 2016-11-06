const RUN_SPEED = 5.5;

function Slider() {
  this.x = GAME_WIDTH / 2;
  this.y = GAME_HEIGHT / 2;
};

Slider.prototype.move = function(keyboard, bricks) {
  var nextX = this.x;
  var nextY = this.y;

  if (keyboard.isKeyPressed(KEY_LEFT_ARROW)) {
    nextX += -RUN_SPEED;
  }
  if (keyboard.isKeyPressed(KEY_RIGHT_ARROW)) {
    nextX += RUN_SPEED;
  }
  if (keyboard.isKeyPressed(KEY_UP_ARROW)) {
    nextY += -RUN_SPEED;
  }
  if (keyboard.isKeyPressed(KEY_DOWN_ARROW)) {
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
