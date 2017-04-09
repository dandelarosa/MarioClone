const BRICK_WIDTH = 16;
const BRICK_HEIGHT = 16;

function Bricks(grid, tileset) {
  this.grid2d = grid;
  this.tileset = tileset;
}

// Grid Info

Bricks.prototype.brickTileToIndex = function(tileCol, tileRow) {
  return (tileCol + this.grid2d.numCols * tileRow);
}

Bricks.prototype.colForPixelX = function(pixelX) {
  var result = Math.floor(pixelX / BRICK_WIDTH);
  return result;
}

Bricks.prototype.getGridData = function() {
  return this.grid2d.getData();
};

Bricks.prototype.maxX = function() {
  return this.grid2d.numCols * BRICK_WIDTH;
};

Bricks.prototype.maxY = function() {
  var numRows = this.getGridData().length / this.grid2d.numCols;
  return numRows * BRICK_HEIGHT;
};

Bricks.prototype.minX = function() {
  return 0;
};

Bricks.prototype.minY = function() {
  return 0;
};

Bricks.prototype.rowForPixelY = function(pixelY) {
  var result = Math.floor(pixelY / BRICK_HEIGHT);
  return result;
};

// Looking at brick values

Bricks.prototype.isSolidAtPoint = function(x, y) {
  var tileValue = this.tileValueAtPoint(x, y);
  return tileValue === TILE_V2_GROUND_BLOCK
  || tileValue === TILE_V2_SOLID_BLOCK
  || tileValue === TILE_V2_BRICK_BLOCK
  || tileValue === TILE_V2_ITEM_BLOCK
  || tileValue === TILE_V2_EMPTY_BLOCK
  || tileValue === TILE_V2_TREE_TOP_LEFT
  || tileValue === TILE_V2_TREE_TOP_CENTER
  || tileValue === TILE_V2_TREE_TOP_RIGHT
  || tileValue === TILE_V2_PIPE_TOP_END_LEFT
  || tileValue === TILE_V2_PIPE_TOP_END_RIGHT
  || tileValue === TILE_V2_PIPE_V_LEFT
  || tileValue === TILE_V2_PIPE_V_RIGHT
  || tileValue === TILE_V2_PIPE_H_TOP
  || tileValue === TILE_V2_PIPE_H_BOTTOM
  || tileValue === TILE_V2_PIPE_LEFT_END_TOP
  || tileValue === TILE_V2_PIPE_LEFT_END_BOTTOM
  || tileValue === TILE_V2_PIPE_LEFT_INT_TOP
  || tileValue === TILE_V2_PIPE_LEFT_INT_BOTTOM;
};

Bricks.prototype.tileValueAtPoint = function(x, y) {
  var tileCol = x / BRICK_WIDTH;
  var tileRow = y / BRICK_HEIGHT;

  // using Math.floor to round down to the nearest whole number
  tileCol = Math.floor(tileCol);
  tileRow = Math.floor(tileRow);

  // first check whether the jumper is within any part of the brick wall
  var numRows = this.getGridData().length / this.grid2d.numCols;
  if(tileCol < 0 || tileCol >= this.grid2d.numCols ||
     tileRow < 0 || tileRow >= numRows) {
     return TILE_OUT_OF_BOUNDS;
  }

  return this.tileValueAtColRow(tileCol, tileRow);
};

Bricks.prototype.tileValueAtColRow = function(col, row) {
  var brickIndex = this.brickTileToIndex(col, row);
  return this.grid2d.valueAtIndex(brickIndex);
};

// Editing bricks

Bricks.prototype.toggleValueAtColRow = function(col, row, value) {
  var index = this.grid2d.indexForColAndRow(col, row);
  if (this.grid2d.valueAtIndex(index) === value) {
    this.grid2d.changeValueAtIndex(index, TILE_EMPTY);
  }
  else {
    this.grid2d.changeValueAtIndex(index, value);
  }
}

// Drawing bricks

Bricks.prototype.drawBricksInRect = function(x, y, width, height, graphics) {
  var leftMostCol = Math.floor(x / BRICK_WIDTH);
  var topMostRow = Math.floor(y / BRICK_HEIGHT);

  var colsThatFitInRect = Math.floor(width / BRICK_WIDTH);
  var rowsThatFitInRect = Math.floor(height / BRICK_HEIGHT);

  // Draw a one-cell buffer on each side
  var rightMostCol = leftMostCol + colsThatFitInRect + 2;
  var bottomMostRow = topMostRow + rowsThatFitInRect + 2;

  for (var row = topMostRow; row < bottomMostRow; row++) {
    for (var col = leftMostCol; col < rightMostCol; col++) {
      var tileIndex = this.grid2d.indexForColAndRow(col, row);
      var leftX = col * BRICK_WIDTH;
      var topY = row * BRICK_HEIGHT;
      var tileValue = this.grid2d.valueAtIndex(tileIndex);
      this.tileset.drawTile(graphics, tileValue, leftX, topY);
    }
  }
};
