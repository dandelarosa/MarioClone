const EDITOR_CAMERA_SPEED = 16;

function EditorCamera(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

EditorCamera.prototype = (function() {
  return {
    getRect: getRect,
    update: update,
  };

  /**
   * Gets the object's rect value.
   * @returns {Object} The object's rect.
   */
  function getRect() {
    return new Rect2D(this.x, this.y, this.width, this.height);
  }

  /**
   * Updates the camera's position
   * @param {Object} keyboard - The keyboard controlling the camera.
   * @param {Object} tiles - The object with the bounds data.
   */
  function update(keyboard, tiles) {
    var nextX = this.x;
    var nextY = this.y;

    if (keyboard.isKeyPressed(KEY_LEFT_ARROW)) {
      nextX -= EDITOR_CAMERA_SPEED;
    }
    if (keyboard.isKeyPressed(KEY_RIGHT_ARROW)) {
      nextX += EDITOR_CAMERA_SPEED;
    }
    if (keyboard.isKeyPressed(KEY_UP_ARROW)) {
      nextY -= EDITOR_CAMERA_SPEED;
    }
    if (keyboard.isKeyPressed(KEY_DOWN_ARROW)) {
      nextY += EDITOR_CAMERA_SPEED;
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
  }
})();
