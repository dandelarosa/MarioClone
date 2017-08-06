function PlayerDeathState() {
}

PlayerDeathState.prototype = (function() {
  return {
    shouldCheckForEnemyCollisions: shouldCheckForEnemyCollisions,
    update: update,
  };

  function shouldCheckForEnemyCollisions() {
    return false;
  }

  function update(physicsObject, keyboard, collisionDetectors) {
    var rect = physicsObject.getRect();
    var speed = physicsObject.getSpeed();

    speed.y += GRAVITY;
    // cheap test to ensure can't fall through floor
    if (speed.y > JUMPER_RADIUS) {
      speed.y = JUMPER_RADIUS;
    }

    rect.x += speed.x;
    rect.y += speed.y;
  }
})();
