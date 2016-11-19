const CAMERA_SPEED = 20;

function Camera(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Camera.prototype.update = function(keyboard, bricks) {
  var nextX = this.x;
  var nextY = this.y;

  if (keyboard.isKeyPressed(KEY_LEFT_ARROW)) {
    nextX -= CAMERA_SPEED;
  }
  if (keyboard.isKeyPressed(KEY_RIGHT_ARROW)) {
    nextX += CAMERA_SPEED;
  }
  if (keyboard.isKeyPressed(KEY_UP_ARROW)) {
    nextY -= CAMERA_SPEED;
  }
  if (keyboard.isKeyPressed(KEY_DOWN_ARROW)) {
    nextY += CAMERA_SPEED;
  }

  if (nextX < bricks.minX()) {
    nextX = bricks.minX();
  }
  if (nextY < bricks.minY()) {
    nextY = bricks.minY();
  }
  if (nextX + this.width > bricks.maxX()) {
    nextX = bricks.maxX() - this.width;
  }
  if (nextY + this.height > bricks.maxY()) {
    nextY = bricks.maxY() - this.height;
  }

  this.x = nextX;
  this.y = nextY;
};
