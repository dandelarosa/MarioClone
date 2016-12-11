const BRICK_GAP = 1;

function Bricks(grid) {
  this.grid = grid;
}

Bricks.prototype.brickTileToIndex = function(tileCol, tileRow) {
  return (tileCol + this.grid.numCols * tileRow);
}

Bricks.prototype.colForPixelX = function(pixelX) {
  var result = Math.floor(pixelX / this.grid.cellWidth);
  return result;
}

Bricks.prototype.drawAll = function(graphics) {
  for (var index = 0; index < this.grid.length; index++) {
    if (this.grid.valueAtIndex(index) === 1) {
      var leftX = this.grid.xForIndex(index);
      var topY = this.grid.yForIndex(index);
      graphics.fillRect(leftX , topY, this.grid.cellWidth - BRICK_GAP,
        this.grid.cellHeight - BRICK_GAP, 'blue');
    }
  }
};

Bricks.prototype.isBrickAtPixelCoord = function(hitPixelX, hitPixelY) {
  var tileCol = hitPixelX / this.grid.cellWidth;
  var tileRow = hitPixelY / this.grid.cellHeight;

  // using Math.floor to round down to the nearest whole number
  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);

  // first check whether the jumper is within any part of the brick wall
  if(tileCol < 0 || tileCol >= this.grid.numCols ||
     tileRow < 0 || tileRow >= this.grid.numRows) {
     return false;
  }

  var brickIndex = this.brickTileToIndex(tileCol, tileRow);
  return (this.grid.valueAtIndex(brickIndex) == 1);
};

Bricks.prototype.maxX = function() {
  return this.grid.maxX();
};

Bricks.prototype.maxY = function() {
  return this.grid.maxY();
};

Bricks.prototype.minX = function() {
  return this.grid.minX();
};

Bricks.prototype.minY = function() {
  return this.grid.minY();
};

Bricks.prototype.rowForPixelY = function(pixelY) {
  var result = Math.floor(pixelY / this.grid.cellHeight);
  return result;
}
