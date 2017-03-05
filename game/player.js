const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
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
  this.width = 16;

  function draw(graphics) {
    this.drawBoundingBox(graphics);
  }

  function drawBoundingBox(graphics) {
    graphics.fillRect(this.x, this.y, this.width, this.height, 'white');
  }
};

Player.prototype.move = function(keyboard, bricks) {
  var jumpPressed = keyboard.isKeyPressed(KEY_UP_ARROW) ||
    keyboard.isKeyPressed(KEY_SPACE);
  if (jumpPressed && this.onGround) {
    this.speedY = -JUMP_POWER;
  }

  if (this.onGround) {
     this.speedX *= GROUND_FRICTION;
   }
   else {
     this.speedX *= AIR_RESISTANCE;
     this.speedY += GRAVITY;
     // cheap test to ensure can't fall through floor
     if (this.speedY > JUMPER_RADIUS) {
       this.speedY = JUMPER_RADIUS;
     }
   }

   if (keyboard.isKeyPressed(KEY_LEFT_ARROW)) {
     this.speedX = -RUN_SPEED;
   }
   if (keyboard.isKeyPressed(KEY_RIGHT_ARROW)) {
     this.speedX = RUN_SPEED;
   }

  var topY = this.y;
  var bottomY = this.y + this.height;
  var leftX = this.x;
  var rightX = this.x + this.width;
  var futureTopY = this.y + this.speedY;
  var futureLeftX = this.x + this.speedX;
  var futureRightX = this.x + this.width + this.speedX;
  // If future top side is inside a wall, push to row below
  if (this.speedY < 0
    && (bricks.isSolidAtPoint(this.x, futureTopY) || bricks.isSolidAtPoint(rightX, futureTopY))) {
    this.y = Math.floor(this.y / bricks.grid.cellHeight) * bricks.grid.cellHeight;
    this.speedY = 0.0;
  }

   if (this.speedY > 0 &&
       bricks.isSolidAtPoint(this.x, this.y + JUMPER_RADIUS) == 1) {
     this.y = (1 + Math.floor(this.y / bricks.grid.cellHeight)) * bricks.grid.cellHeight - JUMPER_RADIUS;
     this.onGround = true;
     this.speedY = 0;
   }
   else if (bricks.isSolidAtPoint(this.x, this.y + JUMPER_RADIUS + 2) == 0) {
     this.onGround = false;
   }

  // If left side is already inside a wall, push to the column to the right
  if (this.speedX < 0
    && (bricks.isSolidAtPoint(futureLeftX, topY))) {
    this.x = Math.floor(leftX / bricks.grid.cellWidth) * bricks.grid.cellWidth;
    this.speedX = 0;
  }
  // If right side is already inside a wall, push to the column to the left
  else if (this.speedX > 0
    && (bricks.isSolidAtPoint(futureRightX, topY))) {
    this.x = Math.ceil(rightX / bricks.grid.cellWidth) * bricks.grid.cellWidth - this.width;
    this.speedX = 0;
  }

   this.x += this.speedX; // move the jumper based on its current horizontal speed
   this.y += this.speedY; // same as above, but for vertical
};
