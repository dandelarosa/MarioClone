
function PlayerCamera(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.leftSnapThreshold = 103;
  this.rightSnapThreshold = 153;
}

PlayerCamera.prototype = (function() {
  return {
    follow: follow,
    getRect: getRect,
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
   * @param {Object} player - The player to follow.
   * @param {Object} tiles - The object with the bounds data.
   */
  function follow(player, tiles) {
    // Values relative to the camera
    var leftSnapThreshold = this.leftSnapThreshold ;
    var rightSnapThreshold = this.rightSnapThreshold;
    var cameraCenterX = this.x + this.width / 2;

    var rect2 = player.getRect();

    // Left camera threshold
    var canMoveCameraLeft = false;
    var playerLeft = rect2.x;
    if (canMoveCameraLeft && playerLeft < this.x + leftSnapThreshold) {
      this.x = playerLeft - leftSnapThreshold;
    }

    // Right camera threshold
    var canMoveCameraRight = true;
    var playerRight = rect2.x + rect2.width;
    if (canMoveCameraRight && playerRight > this.x + rightSnapThreshold) {
      this.x = playerRight - rightSnapThreshold;
    }

    // this next code blocks the game from showing out of bounds
    // (this isn't required, if you don't mind seeing beyond edges)
    if (this.x < tiles.minX()) {
      this.x = tiles.minX();
    }
    if (this.y < tiles.minY()) {
      this.y = tiles.minY();
    }
    var maxPanRight = tiles.maxX() - this.width;
    var maxPanTop = tiles.maxY() - this.height;
    if (this.x > maxPanRight) {
      this.x = maxPanRight;
    }
    if (this.y > maxPanTop) {
      this.y = maxPanTop;
    }
  }
})();
