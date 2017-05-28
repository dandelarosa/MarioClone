const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 9.0;
const GRAVITY = 0.6;

var JUMPER_RADIUS = 10;

function Player(x, y) {
  this.onGround = false;
  var rect = new Rect2D(x, y, 16, 16);
  var speed = new Vector2D(0, 0);
  this.physicsObject = new PhysicsObject2D(rect, speed);
};

Player.prototype = (function() {
  return {
    draw: draw,
    drawBoundingBox: drawBoundingBox,
    getRect: getRect,
    getSpeed: getSpeed,
    isJumpButtonPressed: isJumpButtonPressed,
    move: move,
    updateSpeedX: updateSpeedX,
  };

  // Properties

  function getRect() {
    return this.physicsObject.rect;
  }

  function getSpeed() {
    return this.physicsObject.speed;
  }

  // Input

  function isJumpButtonPressed(keyboard) {
    return keyboard.isKeyPressedThisFrame(KEY_UP_ARROW)
    || keyboard.isKeyPressedThisFrame(KEY_SPACE)
    || keyboard.isKeyPressedThisFrame(KEY_X);
  }

  // Movement

  function move(keyboard, tiles) {
    var rect = this.getRect();
    var speed = this.getSpeed();

    var jumpPressed = this.isJumpButtonPressed(keyboard);
    if (jumpPressed && this.onGround) {
      speed.y = -JUMP_POWER;
    }

    if (this.onGround) {
      if (keyboard.isKeyPressed(KEY_Z)) {
        this.updateSpeedX(keyboard, 0.5, 6.0, GROUND_FRICTION);
      }
      else {
        this.updateSpeedX(keyboard, 0.3, 3.0, GROUND_FRICTION);
      }
    }
    else {
      this.updateSpeedX(keyboard, 0.3, 3.0, AIR_RESISTANCE);
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

    // If future top side is inside a wall, push to row below
    if (speed.y < 0 && tiles.isSolidAtPoint(rect.x, futureTopY)) {
      rect.y = Math.floor(rect.y / tiles.getTileHeight()) * tiles.getTileHeight();
      speed.y = 0.0;
    }
    else if (speed.y < 0 && tiles.isSolidAtPoint(rightX - 1, futureTopY)) {
      rect.y = Math.floor(rect.y / tiles.getTileHeight()) * tiles.getTileHeight();
      speed.y = 0.0;
    }
    // If future bottom side is inside a wall, push to row above
    else if (speed.y > 0 && tiles.isSolidAtPoint(leftX, futureBottomY)) {
      rect.y = (Math.floor(futureBottomY / tiles.getTileHeight())) * tiles.getTileHeight() - rect.height;
      this.onGround = true;
      speed.y = 0;
    }
    else if (speed.y > 0 && tiles.isSolidAtPoint(rightX - 1, futureBottomY)) {
      rect.y = (Math.floor(futureBottomY / tiles.getTileHeight())) * tiles.getTileHeight() - rect.height;
      this.onGround = true;
      speed.y = 0;
    }
    else if (tiles.isSolidAtPoint(rect.x, rect.y + rect.height + 2) == 0) {
      this.onGround = false;
    }

    // If left side is already inside a wall, push to the column to the right
    if (speed.x < 0 && (tiles.isSolidAtPoint(futureLeftX, topY))) {
      rect.x = Math.floor(leftX / tiles.getTileWidth()) * tiles.getTileWidth();
      speed.x = 0;
    }
    else if (speed.x < 0 && (tiles.isSolidAtPoint(futureLeftX, bottomY - 1))) {
      rect.x = Math.floor(leftX / tiles.getTileWidth()) * tiles.getTileWidth();
      speed.x = 0;
    }
    // If right side is already inside a wall, push to the column to the left
    else if (speed.x > 0 && (tiles.isSolidAtPoint(futureRightX, topY))) {
      rect.x = Math.ceil(rightX / tiles.getTileWidth()) * tiles.getTileWidth() - rect.width;
      speed.x = 0;
    }
    else if (speed.x > 0 && (tiles.isSolidAtPoint(futureRightX, bottomY - 1))) {
      rect.x = Math.ceil(rightX / tiles.getTileWidth()) * tiles.getTileWidth() - rect.width;
      speed.x = 0;
    }

    rect.x += speed.x; // move the jumper based on its current horizontal speed
    rect.y += speed.y; // same as above, but for vertical
  }

  function updateSpeedX(keyboard, acceleration, maxSpeed, friction) {
    var speed = this.getSpeed();
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

  // Drawing

  function draw(graphics) {
    this.drawBoundingBox(graphics);
  }

  function drawBoundingBox(graphics) {
    var rect = this.getRect();
    graphics.fillRect(rect.x, rect.y, rect.width, rect.height, 'white');
  }
})();
