function Goomba(spawnPoint) {
  this.isDead = false;
  this.deathTimer = 20;
  var rect = new Rect2D(spawnPoint.x, spawnPoint.y, 16, 16);
  var speed = new Vector2D(-1, 0);
  this.physicsObject = new PhysicsObject2D(rect, speed);
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
    var speed = this.getSpeed();
    speed.x = 0;
  }

  // Movement

  function update(tiles) {
    var rect = this.getRect();
    var speed = this.getSpeed();

    if (!this.onGround) {
      speed.y += GRAVITY;
      // cheap test to ensure can't fall through floor
      if (speed.y > JUMPER_RADIUS) {
        speed.y = JUMPER_RADIUS;
      }
    }

    var topY = rect.y;
    var bottomY = rect.y + rect.height;
    var leftX = rect.x;
    var rightX = rect.x + rect.width;
    var futureTopY = rect.y + speed.y;
    var futureBottomY = rect.y + rect.height + speed.y;
    var futureLeftX = rect.x + speed.x;
    var futureRightX = rect.x + rect.width + speed.x;

    if (speed.x < 0 && leftX <= tiles.minX()) {
      rect.x = tiles.minX();
      speed.x = 0.0;
    }
    else if (speed.x > 0 && rightX >= tiles.maxX()) {
      rect.x = tiles.maxX() - rect.width;
      speed.x = 0.0;
    }

    var tileWidth = tiles.getTileWidth();
    var tileHeight = tiles.getTileHeight();

    // If future top side is inside a wall, push to row below
    if (speed.y < 0 && tiles.isSolidAtPoint(rect.x, futureTopY)) {
      rect.y = Math.floor(rect.y / tileHeight) * tileHeight;
      speed.y = 0.0;
    }
    else if (speed.y < 0 && tiles.isSolidAtPoint(rightX - 1, futureTopY)) {
      rect.y = Math.floor(rect.y / tileHeight) * tileHeight;
      speed.y = 0.0;
    }
    // If future bottom side is inside a wall, push to row above
    else if (speed.y > 0 && tiles.isSolidAtPoint(leftX, futureBottomY)) {
      rect.y = (Math.floor(futureBottomY / tileHeight)) * tileHeight - rect.height;
      this.onGround = true;
      speed.y = 0;
    }
    else if (speed.y > 0 && tiles.isSolidAtPoint(rightX - 1, futureBottomY)) {
      rect.y = (Math.floor(futureBottomY / tileHeight)) * tileHeight - rect.height;
      this.onGround = true;
      speed.y = 0;
    }
    else if (tiles.isSolidAtPoint(rect.x, rect.y + rect.height + 2) == 0) {
      this.onGround = false;
    }

    // If left side is already inside a wall, push to the column to the right
    if (speed.x < 0 && (tiles.isSolidAtPoint(futureLeftX, topY))) {
      rect.x = Math.floor(leftX / tileWidth) * tileWidth;
      speed.x = -speed.x;
    }
    else if (speed.x < 0 && (tiles.isSolidAtPoint(futureLeftX, bottomY - 1))) {
      rect.x = Math.floor(leftX / tileWidth) * tileWidth;
      speed.x = -speed.x;
    }
    // If right side is already inside a wall, push to the column to the left
    else if (speed.x > 0 && (tiles.isSolidAtPoint(futureRightX, topY))) {
      rect.x = Math.ceil(rightX / tileWidth) * tileWidth - rect.width;
      speed.x = -speed.x;
    }
    else if (speed.x > 0 && (tiles.isSolidAtPoint(futureRightX, bottomY - 1))) {
      rect.x = Math.ceil(rightX / tileWidth) * tileWidth - rect.width;
      speed.x = -speed.x;
    }

    rect.x += speed.x; // move the jumper based on its current horizontal speed
    rect.y += speed.y; // same as above, but for vertical

    if (this.isDead) {
      this.deathTimer--;
    }
  }

  function draw(graphics) {
    var rect = this.getRect();
    if (this.isDead) {
      graphics.fillRect(rect.x, rect.y + rect.height / 2, rect.width, rect.height / 2, 'red');
    }
    else {
      graphics.fillRect(rect.x, rect.y, rect.width, rect.height, 'red');
    }
  }
})();
