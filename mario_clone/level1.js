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
