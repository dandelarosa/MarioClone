function EditorCamera() {
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.speed = 15;
};

EditorCamera.prototype.update = function(keyboard, bounds) {
  var nextX = this.x;
  var nextY = this.y;

  if (keyboard.isKeyPressed(KEY_LEFT_ARROW)) {
    nextX += -this.speed;
  }
  if (keyboard.isKeyPressed(KEY_RIGHT_ARROW)) {
    nextX += this.speed;
  }
  if (keyboard.isKeyPressed(KEY_UP_ARROW)) {
    nextY += -this.speed;
  }
  if (keyboard.isKeyPressed(KEY_DOWN_ARROW)) {
    nextY += this.speed;
  }

  if (nextX < bounds.minX) {
    nextX = bounds.minX;
  }
  if (nextY < bounds.minY) {
    nextY = bounds.minY;
  }
  if (nextX + this.width > bounds.maxX) {
    nextX = bounds.maxX - this.width;
  }
  if (nextY + this.height > bounds.maxY) {
    nextY = bounds.maxY - this.height;
  }

  this.x = nextX;
  this.y = nextY;
};
