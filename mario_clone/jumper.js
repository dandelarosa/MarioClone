const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GRAVITY = 0.6;

var JUMPER_RADIUS = 10;

function Jumper() {
  this.x = GAME_WIDTH / 2;
  this.y = GAME_HEIGHT / 2;
  this.speedX = 0;
  this.speedY = 0;
  this.onGround = false;
};

Jumper.prototype.move = function(keyEvents, bricks) {
  if (holdJump && this.onGround) {
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

   if (holdLeft) {
     this.speedX = -RUN_SPEED;
   }
   if (holdRight) {
     this.speedX = RUN_SPEED;
   }

   if (this.speedY < 0 &&
       bricks.isBrickAtPixelCoord(this.x, this.y - JUMPER_RADIUS) == 1) {
     this.y = (Math.floor(this.y / BRICK_H)) * BRICK_H + JUMPER_RADIUS;
     this.speedY = 0.0;
   }

   if (this.speedY > 0 &&
       bricks.isBrickAtPixelCoord(this.x, this.y + JUMPER_RADIUS) == 1) {
     this.y = (1 + Math.floor(this.y / BRICK_H)) * BRICK_H - JUMPER_RADIUS;
     this.onGround = true;
     this.speedY = 0;
   }
   else if (bricks.isBrickAtPixelCoord(this.x, this.y + JUMPER_RADIUS + 2) == 0) {
     this.onGround = false;
   }

   if (this.speedX < 0 &&
       bricks.isBrickAtPixelCoord(this.x - JUMPER_RADIUS,this.y) == 1) {
     this.x = (Math.floor(this.x / BRICK_W)) * BRICK_W + JUMPER_RADIUS;
   }
   if (this.speedX > 0 &&
       bricks.isBrickAtPixelCoord(this.x + JUMPER_RADIUS, this.y) == 1) {
     this.x = (1 + Math.floor(this.x / BRICK_W)) * BRICK_W - JUMPER_RADIUS;
   }

   this.x += this.speedX; // move the jumper based on its current horizontal speed
   this.y += this.speedY; // same as above, but for vertical
};

Jumper.prototype.draw = function(graphics) {
  graphics.colorCircle(this.x, this.y, JUMPER_RADIUS, 'white');
};
