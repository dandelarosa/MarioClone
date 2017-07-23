const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;

function TileGrid(grid, tileset) {
  this.grid = grid;
  this.tileset = tileset;
}

TileGrid.prototype = (function() {
  return {
    brickTileToIndex: brickTileToIndex,
    colForPixelX: colForPixelX,
    drawInRect: drawInRect,
    getGridData: getGridData,
    getNumCols: getNumCols,
    getTileHeight: getTileHeight,
    getTileWidth: getTileWidth,
    isSolidAtPoint: isSolidAtPoint,
    maxX: maxX,
    maxY: maxY,
    minX: minX,
    minY: minY,
    rowForPixelY: rowForPixelY,
    tileValueAtColRow: tileValueAtColRow,
    tileValueAtPoint: tileValueAtPoint,
    toggleValueAtColRow: toggleValueAtColRow,
  };

  // Grid Info

  function brickTileToIndex(tileCol, tileRow) {
    return (tileCol + this.grid.numCols * tileRow);
  }

  function colForPixelX(pixelX) {
    var result = Math.floor(pixelX / TILE_WIDTH);
    return result;
  }

  function getGridData() {
    return this.grid.getData();
  };

  function getNumCols() {
    return this.grid.numCols;
  }

  function maxX() {
    return this.grid.numCols * TILE_WIDTH;
  };

  function maxY() {
    var numRows = this.getGridData().length / this.grid.numCols;
    return numRows * TILE_HEIGHT;
  };

  function minX() {
    return 0;
  };

  function minY() {
    return 0;
  };

  function rowForPixelY(pixelY) {
    var result = Math.floor(pixelY / TILE_HEIGHT);
    return result;
  };

  function getTileWidth() {
    return TILE_WIDTH;
  }

  function getTileHeight() {
    return TILE_HEIGHT;
  }

  // Looking at brick values

  function isSolidAtPoint(x, y) {
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
    || tileValue === TILE_V2_PIPE_LEFT_INT_BOTTOM
    || tileValue === TILE_V2_BRIDGE;
  };

  function tileValueAtPoint(x, y) {
    var tileCol = x / TILE_WIDTH;
    var tileRow = y / TILE_HEIGHT;

    // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    // first check whether the jumper is within any part of the brick wall
    var numRows = this.getGridData().length / this.grid.numCols;
    if(tileCol < 0 || tileCol >= this.grid.numCols ||
       tileRow < 0 || tileRow >= numRows) {
       return TILE_OUT_OF_BOUNDS;
    }

    return this.tileValueAtColRow(tileCol, tileRow);
  };

  function tileValueAtColRow(col, row) {
    var brickIndex = this.brickTileToIndex(col, row);
    return this.grid.valueAtIndex(brickIndex);
  };

  // Editing bricks

  function toggleValueAtColRow(col, row, value) {
    var index = this.grid.indexForColAndRow(col, row);
    if (this.grid.valueAtIndex(index) === value) {
      this.grid.setValueAtIndex(TILE_V2_EMPTY, index);
    }
    else {
      this.grid.setValueAtIndex(value, index);
    }
  }

  // Drawing bricks

  function drawInRect(rect, graphics) {
    var leftMostCol = Math.floor(rect.x / TILE_WIDTH);
    var topMostRow = Math.floor(rect.y / TILE_HEIGHT);

    var colsThatFitInRect = Math.floor(rect.width / TILE_WIDTH);
    var rowsThatFitInRect = Math.floor(rect.height / TILE_HEIGHT);

    // Draw a one-cell buffer on each side
    var rightMostCol = leftMostCol + colsThatFitInRect + 2;
    var bottomMostRow = topMostRow + rowsThatFitInRect + 2;

    for (var row = topMostRow; row < bottomMostRow; row++) {
      for (var col = leftMostCol; col < rightMostCol; col++) {
        var tileIndex = this.grid.indexForColAndRow(col, row);
        var leftX = col * TILE_WIDTH;
        var topY = row * TILE_HEIGHT;
        var tileValue = this.grid.valueAtIndex(tileIndex);
        this.tileset.drawTile(graphics, tileValue, leftX, topY);
      }
    }
  };
})();
