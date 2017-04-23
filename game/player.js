const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 9.0;
const GRAVITY = 0.6;

var JUMPER_RADIUS = 10;

function Player(x, y) {
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.onGround = false;

  this.draw = draw;
  this.drawBoundingBox = drawBoundingBox;
  this.height = 16;
  this.isJumpButtonPressed = isJumpButtonPressed;
  this.updateSpeedX = updateSpeedX;
  this.width = 16;

  // Input

  function isJumpButtonPressed(keyboard) {
    return keyboard.isKeyPressedThisFrame(KEY_UP_ARROW)
    || keyboard.isKeyPressedThisFrame(KEY_SPACE)
    || keyboard.isKeyPressedThisFrame(KEY_X);
  }

  // Movement

  function updateSpeedX(keyboard, acceleration, maxSpeed, friction) {
    if (keyboard.isKeyPressed(KEY_LEFT_ARROW)) {
      if (this.speedX < -maxSpeed) {
        this.speedX *= friction;
      }
      else {
        this.speedX -= acceleration;
        this.speedX = Math.max(this.speedX, -maxSpeed);
      }
    }
    else if (keyboard.isKeyPressed(KEY_RIGHT_ARROW)) {
      if (this.speedX > maxSpeed) {
        this.speedX *= friction;
      }
      else {
        this.speedX += acceleration;
        this.speedX = Math.min(this.speedX, maxSpeed);
      }
    }
    else {
      this.speedX *= friction;
    }
  }

  // Drawing

  function draw(graphics) {
    this.drawBoundingBox(graphics);
  }

  function drawBoundingBox(graphics) {
    graphics.fillRect(this.x, this.y, this.width, this.height, 'white');
  }
};

Player.prototype.move = function(keyboard, bricks) {
  var jumpPressed = this.isJumpButtonPressed(keyboard);
  if (jumpPressed && this.onGround) {
    this.speedY = -JUMP_POWER;
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
    this.speedY += GRAVITY;
    // cheap test to ensure can't fall through floor
    if (this.speedY > JUMPER_RADIUS) {
      this.speedY = JUMPER_RADIUS;
    }
  }

  var topY = this.y;
  var bottomY = this.y + this.height;
  var leftX = this.x;
  var rightX = this.x + this.width;
  var futureTopY = this.y + this.speedY;
  var futureBottomY = this.y + this.height + this.speedY;
  var futureLeftX = this.x + this.speedX;
  var futureRightX = this.x + this.width + this.speedX;

  if (this.speedX < 0 && leftX <= bricks.minX()) {
    this.x = bricks.minX();
    this.speedX = 0.0;
  }
  else if (this.speedX > 0 && rightX >= bricks.maxX()) {
    this.x = bricks.maxX() - this.width;
    this.speedX = 0.0;
  }

  // If future top side is inside a wall, push to row below
  if (this.speedY < 0 && bricks.isSolidAtPoint(this.x, futureTopY)) {
    this.y = Math.floor(this.y / bricks.getTileHeight()) * bricks.getTileHeight();
    this.speedY = 0.0;
  }
  else if (this.speedY < 0 && bricks.isSolidAtPoint(rightX - 1, futureTopY)) {
    this.y = Math.floor(this.y / bricks.getTileHeight()) * bricks.getTileHeight();
    this.speedY = 0.0;
  }
  // If future bottom side is inside a wall, push to row above
  else if (this.speedY > 0 && bricks.isSolidAtPoint(leftX, futureBottomY)) {
    this.y = (Math.floor(futureBottomY / bricks.getTileHeight())) * bricks.getTileHeight() - this.height;
    this.onGround = true;
    this.speedY = 0;
  }
  else if (this.speedY > 0 && bricks.isSolidAtPoint(rightX - 1, futureBottomY)) {
    this.y = (Math.floor(futureBottomY / bricks.getTileHeight())) * bricks.getTileHeight() - this.height;
    this.onGround = true;
    this.speedY = 0;
  }
  else if (bricks.isSolidAtPoint(this.x, this.y + this.height + 2) == 0) {
    this.onGround = false;
  }

  // If left side is already inside a wall, push to the column to the right
  if (this.speedX < 0 && (bricks.isSolidAtPoint(futureLeftX, topY))) {
    this.x = Math.floor(leftX / bricks.getTileWidth()) * bricks.getTileWidth();
    this.speedX = 0;
  }
  else if (this.speedX < 0 && (bricks.isSolidAtPoint(futureLeftX, bottomY - 1))) {
    this.x = Math.floor(leftX / bricks.getTileWidth()) * bricks.getTileWidth();
    this.speedX = 0;
  }
  // If right side is already inside a wall, push to the column to the left
  else if (this.speedX > 0 && (bricks.isSolidAtPoint(futureRightX, topY))) {
    this.x = Math.ceil(rightX / bricks.getTileWidth()) * bricks.getTileWidth() - this.width;
    this.speedX = 0;
  }
  else if (this.speedX > 0 && (bricks.isSolidAtPoint(futureRightX, bottomY - 1))) {
    this.x = Math.ceil(rightX / bricks.getTileWidth()) * bricks.getTileWidth() - this.width;
    this.speedX = 0;
  }

  this.x += this.speedX; // move the jumper based on its current horizontal speed
  this.y += this.speedY; // same as above, but for vertical
};
