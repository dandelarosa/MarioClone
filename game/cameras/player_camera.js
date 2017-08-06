
function PlayerCamera(x, y, width, height) {
  var rect = new Rect2D(x, y, width, height);
  var speed = new Vector2D(0, 0);
  this.physicsObject = new PhysicsObject2D(rect, speed);

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
    return this.physicsObject.getRect();
  }

  /**
   * Updates the camera's position
   * @param {Object} player - The player to follow.
   * @param {Object} collisionDetectors - The objects that handle collisions.
   */
  function follow(player, collisionDetectors) {
    // Values relative to the camera
    var leftSnapThreshold = this.leftSnapThreshold;
    var rightSnapThreshold = this.rightSnapThreshold;

    var physicsObject = this.physicsObject;
    var rect = physicsObject.rect;
    var speed = physicsObject.speed;

    var playerRect = player.getRect();

    // Left camera threshold
    var canMoveCameraLeft = false;
    var playerLeft = playerRect.x;
    if (canMoveCameraLeft && playerLeft < rect.x + leftSnapThreshold) {
      speed.x = playerLeft - leftSnapThreshold - rect.x;
    }

    // Right camera threshold
    var canMoveCameraRight = true;
    var playerRight = playerRect.x + playerRect.width;
    if (canMoveCameraRight && playerRight > rect.x + rightSnapThreshold) {
      speed.x = playerRight - rightSnapThreshold - rect.x;
    }

    collisionDetectors.level.handleCollisionsWith(physicsObject);

    rect.x += speed.x;
    rect.y += speed.y;

    speed.x = 0;
    speed.y = 0;
  }
})();
