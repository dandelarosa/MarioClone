const BRICK_W = 60;
const BRICK_H = 60;
const BRICK_GAP = 1;
const BRICK_COLS = 20;
const BRICK_ROWS = 15;
var brickGrid = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1,
  1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1,
  1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

function Bricks() {
  this.grid = brickGrid.slice();
};

Bricks.prototype.brickTileToIndex = function(tileCol, tileRow) {
  return (tileCol + BRICK_COLS * tileRow);
}

Bricks.prototype.isBrickAtTileCoord = function(brickTileCol, brickTileRow) {
  var brickIndex = this.brickTileToIndex(brickTileCol, brickTileRow);
  return (brickGrid[brickIndex] == 1);
};

Bricks.prototype.isBrickAtPixelCoord = function(hitPixelX, hitPixelY) {
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

  var brickIndex = this.brickTileToIndex(tileCol, tileRow);
  return (this.grid[brickIndex] == 1);
};

Bricks.prototype.colForX = function(x) {
  return Math.floor(x / BRICK_W);
};

Bricks.prototype.rowForY = function(y) {
  return Math.floor(y / BRICK_H);
}

Bricks.prototype.draw = function(graphics, camera) {
  // what are the top-left most col and row visible on canvas?
  var cameraLeftMostCol = Math.floor(camera.x / BRICK_W);
  var cameraTopMostRow = Math.floor(camera.y / BRICK_H);

  // how many columns and rows of tiles fit on one screenful of area?
  var colsThatFitOnScreen = Math.floor(GAME_WIDTH / BRICK_W);
  var rowsThatFitOnScreen = Math.floor(GAME_HEIGHT / BRICK_H);

  // finding the rightmost and bottommost tiles to draw.
  // the +1 and + 2 on each pushes the new tile popping in off visible area
  // +2 for columns since BRICK_W doesn't divide evenly into canvas.width
  var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
  var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

  for (var eachCol = cameraLeftMostCol; eachCol < cameraRightMostCol; eachCol++) {
    for (var eachRow = cameraTopMostRow; eachRow < cameraBottomMostRow; eachRow++) {
      if (this.isBrickAtTileCoord(eachCol, eachRow)) {
        var brickLeftEdgeX = eachCol * BRICK_W;
        var brickTopEdgeY = eachRow * BRICK_H;
        graphics.colorRect(brickLeftEdgeX, brickTopEdgeY,
          BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
      }
    }
  }
};
