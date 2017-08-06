function PlayerRegularState() {
}

PlayerRegularState.prototype = (function() {
  return {
    isJumpButtonPressed: isJumpButtonPressed,
    shouldCheckForEnemyCollisions: shouldCheckForEnemyCollisions,
    update: update,
    updateSpeedX: updateSpeedX,
  };

  // Properties

  function shouldCheckForEnemyCollisions() {
    return true;
  }

  // Input

  function isJumpButtonPressed(keyboard) {
    return keyboard.isKeyPressedThisFrame(KEY_UP_ARROW)
    || keyboard.isKeyPressedThisFrame(KEY_SPACE)
    || keyboard.isKeyPressedThisFrame(KEY_X);
  }

  // Movement

  function update(physicsObject, keyboard, camera, collisionDetectors) {
    var rect = physicsObject.getRect();
    var speed = physicsObject.getSpeed();

    var jumpPressed = this.isJumpButtonPressed(keyboard);
    if (jumpPressed && physicsObject.onGround) {
      speed.y = -JUMP_POWER;
    }

    if (physicsObject.onGround) {
      if (keyboard.isKeyPressed(KEY_Z)) {
        this.updateSpeedX(speed, keyboard, 0.5, 6.0, GROUND_FRICTION);
      }
      else {
        this.updateSpeedX(speed, keyboard, 0.3, 3.0, GROUND_FRICTION);
      }
    }
    else {
      this.updateSpeedX(speed, keyboard, 0.3, 3.0, 1.0);
      speed.y += GRAVITY;
      // cheap test to ensure can't fall through floor
      if (speed.y > JUMPER_RADIUS) {
        speed.y = JUMPER_RADIUS;
      }
    }

    var leftX = rect.x;
    var rightX = rect.x + rect.width;
    collisionDetectors.level.handleCollisionsWith(physicsObject);

    // Bound by camera
    var cameraRect = camera.getRect();
    var cameraLeft = cameraRect.x;
    var cameraRight = cameraRect.x + cameraRect.width;
    if (speed.x < 0.0 && leftX <= cameraLeft) {
      rect.x = cameraLeft;
      speed.x = 0.0;
    }
    else if (speed.x > 0.0 && rightX >= cameraRight) {
      rect.x = cameraRight - rect.width;
      speed.x = 0.0;
    }

    collisionDetectors.foreground.handleCollisionsWith(physicsObject);

    rect.x += speed.x; // move the jumper based on its current horizontal speed
    rect.y += speed.y; // same as above, but for vertical
  }

  function updateSpeedX(speed, keyboard, acceleration, maxSpeed, friction) {
    if (keyboard.isKeyPressed(KEY_LEFT_ARROW)) {
      if (speed.x < -maxSpeed) {
        speed.x *= friction;
      }
      else {
        speed.x -= acceleration;
        speed.x = Math.max(speed.x, -maxSpeed);
      }
    }
    else if (keyboard.isKeyPressed(KEY_RIGHT_ARROW)) {
      if (speed.x > maxSpeed) {
        speed.x *= friction;
      }
      else {
        speed.x += acceleration;
        speed.x = Math.min(speed.x, maxSpeed);
      }
    }
    else {
      speed.x *= friction;
    }
  }
})();
