function Goomba(spawnPoint) {
  this.isDead = false;
  this.deathTimer = 20;
  var rect = new Rect2D(spawnPoint.x, spawnPoint.y, 16, 16);
  var speed = new Vector2D(-1, 0);
  this.physicsObject = new PhysicsObject2D(rect, speed);
  this.physicsObject.bouncesHorizontal = true;
}

Goomba.prototype = (function() {
  return {
    draw: draw,
    getRect: getRect,
    getSpeed: getSpeed,
    shouldCheckForPlayerCollisions: shouldCheckForPlayerCollisions,
    switchToDeathState: switchToDeathState,
    update: update,
  };

  // Properties

  function getRect() {
    return this.physicsObject.rect;
  }

  function getSpeed() {
    return this.physicsObject.speed;
  }

  function shouldCheckForPlayerCollisions() {
    return !this.isDead;
  }

  // State Machine

  function switchToDeathState() {
    this.isDead = true;
    var rect = this.getRect();
    rect.y = rect.y + rect.height / 2;
    rect.height = rect.height / 2;
    var speed = this.getSpeed();
    speed.x = 0;
  }

  // Movement

  function update(collisionDetectors) {
    var rect = this.getRect();
    var speed = this.getSpeed();

    if (!this.physicsObject.onGround) {
      speed.y += GRAVITY;
      // cheap test to ensure can't fall through floor
      if (speed.y > JUMPER_RADIUS) {
        speed.y = JUMPER_RADIUS;
      }
    }

    collisionDetectors.level.handleCollisionsWith(this.physicsObject);
    collisionDetectors.foreground.handleCollisionsWith(this.physicsObject);

    rect.x += speed.x; // move the jumper based on its current horizontal speed
    rect.y += speed.y; // same as above, but for vertical

    if (this.isDead) {
      this.deathTimer--;
    }
  }

  function draw(graphics) {
    var rect = this.getRect();
    graphics.fillRect(rect, 'red');
  }
})();
