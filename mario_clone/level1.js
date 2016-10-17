const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;
const GRAVITY = 0.6;

var jumperX = 75, jumperY = 75;
var jumperSpeedX = 0, jumperSpeedY = 0;
var jumperOnGround = false;
var JUMPER_RADIUS = 10;

function brickTileToIndex(tileCol, tileRow) {
  return (tileCol + BRICK_COLS * tileRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
  var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return (brickGrid[brickIndex] == 1);
}

function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
  var tileCol = hitPixelX / BRICK_W;
  var tileRow = hitPixelY / BRICK_H;

  // using Math.floor to round down to the nearest whole number
  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);

  // first check whether the jumper is within any part of the brick wall
  if(tileCol < 0 || tileCol >= BRICK_COLS ||
     tileRow < 0 || tileRow >= BRICK_ROWS) {
     return false;
  }

  var brickIndex = brickTileToIndex(tileCol, tileRow);
  return (brickGrid[brickIndex] == 1);
}

function jumperMove() {
 if(jumperOnGround) {
    jumperSpeedX *= GROUND_FRICTION;
  } else {
    jumperSpeedX *= AIR_RESISTANCE;
    jumperSpeedY += GRAVITY;
    if(jumperSpeedY > JUMPER_RADIUS) { // cheap test to ensure can't fall through floor
      jumperSpeedY = JUMPER_RADIUS;
    }
  }

  if(holdLeft) {
    jumperSpeedX = -RUN_SPEED;
  }
  if(holdRight) {
    jumperSpeedX = RUN_SPEED;
  }

  if(jumperSpeedY < 0 && isBrickAtPixelCoord(jumperX, jumperY - JUMPER_RADIUS) == 1) {
    jumperY = (Math.floor(jumperY / BRICK_H)) * BRICK_H + JUMPER_RADIUS;
    jumperSpeedY = 0.0;
  }

  if(jumperSpeedY > 0 && isBrickAtPixelCoord(jumperX, jumperY + JUMPER_RADIUS) == 1) {
    jumperY = (1 + Math.floor(jumperY / BRICK_H)) * BRICK_H - JUMPER_RADIUS;
    jumperOnGround = true;
    jumperSpeedY = 0;
  } else if(isBrickAtPixelCoord(jumperX, jumperY + JUMPER_RADIUS + 2) == 0) {
    jumperOnGround = false;
  }

  if(jumperSpeedX < 0 && isBrickAtPixelCoord(jumperX-JUMPER_RADIUS,jumperY) == 1) {
    jumperX = (Math.floor(jumperX / BRICK_W)) * BRICK_W + JUMPER_RADIUS;
  }
  if(jumperSpeedX > 0 && isBrickAtPixelCoord(jumperX + JUMPER_RADIUS, jumperY) == 1) {
    jumperX = (1 + Math.floor(jumperX / BRICK_W)) * BRICK_W - JUMPER_RADIUS;
  }

  jumperX += jumperSpeedX; // move the jumper based on its current horizontal speed
  jumperY += jumperSpeedY; // same as above, but for vertical
}

function jumperReset() {
  // center jumper on screen
  jumperX = GAME_WIDTH / 2;
  jumperY = GAME_HEIGHT / 2;
}

function Level1() {
  jumperReset();
};

Level1.prototype.update = function() {
  jumperMove();
};

Level1.prototype.draw = function(graphics) {
  graphics.fillWholeScreen('black');

  this.drawBricks(graphics);

  graphics.colorText("Arrow keys to run, spacebar to jump", 8, 14, "white");

  graphics.colorCircle(jumperX, jumperY, JUMPER_RADIUS, 'white')
};

Level1.prototype.drawBricks = function(graphics) {
  for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
      if (isBrickAtTileCoord(eachCol, eachRow)) {
        var brickLeftEdgeX = eachCol * BRICK_W;
        var brickTopEdgeY = eachRow * BRICK_H;
        graphics.colorRect(brickLeftEdgeX, brickTopEdgeY,
                 BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
      }
    }
  }
};
