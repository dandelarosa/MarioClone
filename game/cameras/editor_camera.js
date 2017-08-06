const EDITOR_CAMERA_SPEED = 16;

function EditorCamera(x, y, width, height) {
  var rect = new Rect2D(x, y, width, height);
  var speed = new Vector2D(0, 0);
  this.physicsObject = new PhysicsObject2D(rect, speed);
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
    return this.physicsObject.getRect();
  }

  /**
   * Updates the camera's position
   * @param {Object} keyboard - The keyboard controlling the camera.
   * @param {Object} collisionDetectors - The objects that handle collisions.
   */
  function update(keyboard, collisionDetectors) {
    var physicsObject = this.physicsObject;
    var rect = physicsObject.rect;
    var speed = physicsObject.speed;

    if (keyboard.isKeyPressed(KEY_LEFT_ARROW)) {
      speed.x = -EDITOR_CAMERA_SPEED;
    }
    if (keyboard.isKeyPressed(KEY_RIGHT_ARROW)) {
      speed.x = EDITOR_CAMERA_SPEED;
    }
    if (keyboard.isKeyPressed(KEY_UP_ARROW)) {
      speed.y = -EDITOR_CAMERA_SPEED;
    }
    if (keyboard.isKeyPressed(KEY_DOWN_ARROW)) {
      speed.y = EDITOR_CAMERA_SPEED;
    }

    collisionDetectors.level.handleCollisionsWith(physicsObject);

    rect.x += speed.x;
    rect.y += speed.y;

    speed.x = 0;
    speed.y = 0;
  }
})();
