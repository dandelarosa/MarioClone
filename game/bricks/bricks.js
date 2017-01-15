const BRICK_GAP = 1;

function Bricks(grid) {
  this.grid = grid;
  // TODO: inject this object
  this.tileset = new Tileset();
}

Bricks.prototype.brickTileToIndex = function(tileCol, tileRow) {
  return (tileCol + this.grid.numCols * tileRow);
}

Bricks.prototype.colForPixelX = function(pixelX) {
  var result = Math.floor(pixelX / this.grid.cellWidth);
  return result;
}

Bricks.prototype.getGridData = function() {
  return this.grid.getData();
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
};

// Looking at brick values

Bricks.prototype.isSolidAtPoint = function(x, y) {
  var tileValue = this.tileValueAtPoint(x, y);
  return tileValue === TILE_BROWN_GROUND;
};

Bricks.prototype.tileValueAtPoint = function(x, y) {
  var tileCol = x / this.grid.cellWidth;
  var tileRow = y / this.grid.cellHeight;

  // using Math.floor to round down to the nearest whole number
  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);

  // first check whether the jumper is within any part of the brick wall
  if(tileCol < 0 || tileCol >= this.grid.numCols ||
     tileRow < 0 || tileRow >= this.grid.numRows) {
     return TILE_OUT_OF_BOUNDS;
  }

  var brickIndex = this.brickTileToIndex(tileCol, tileRow);
  return this.grid.valueAtIndex(brickIndex);
};

// Editing bricks

Bricks.prototype.toggleValueAtColRow = function(col, row, value) {
  var index = this.grid.indexForColAndRow(col, row);
  if (this.grid.valueAtIndex(index) === value) {
    this.grid.changeValueAtIndex(index, TILE_EMPTY);
  }
  else {
    this.grid.changeValueAtIndex(index, value);
  }
}

// Drawing bricks

Bricks.prototype.drawBricksInRect = function(x, y, width, height, graphics) {
  var leftMostCol = Math.floor(x / this.grid.cellWidth);
  var topMostRow = Math.floor(y / this.grid.cellHeight);

  var colsThatFitInRect = Math.floor(width / this.grid.cellWidth);
  var rowsThatFitInRect = Math.floor(height / this.grid.cellHeight);

  // Draw a one-cell buffer on each side
  var rightMostCol = leftMostCol + colsThatFitInRect + 2;
  var bottomMostRow = topMostRow + rowsThatFitInRect + 2;

  for (var row = topMostRow; row < bottomMostRow; row++) {
    for (var col = leftMostCol; col < rightMostCol; col++) {
      var tileIndex = this.grid.indexForColAndRow(col, row);
      var leftX = this.grid.xForIndex(tileIndex);
      var topY = this.grid.yForIndex(tileIndex);
      var tileValue = this.grid.valueAtIndex(tileIndex);
      this.tileset.drawTile(graphics, tileValue, leftX, topY);
    }
  }
};
