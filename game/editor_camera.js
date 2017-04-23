const CAMERA_SPEED = 16;

function EditorCamera(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

EditorCamera.prototype.update = function(keyboard, tiles) {
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

  if (nextX < tiles.minX()) {
    nextX = tiles.minX();
  }
  if (nextY < tiles.minY()) {
    nextY = tiles.minY();
  }
  if (nextX + this.width > tiles.maxX()) {
    nextX = tiles.maxX() - this.width;
  }
  if (nextY + this.height > tiles.maxY()) {
    nextY = tiles.maxY() - this.height;
  }

  this.x = nextX;
  this.y = nextY;
};
