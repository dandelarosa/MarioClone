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

function Level1() {
  this.jumper = new Jumper();
};

Level1.prototype.update = function() {
  this.jumper.move();
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
