/**
 * Contains references to the level's data grids.
 * @class
 * @param {Object} builder - An object containing the components used for constructing this object.
 */
function AllGrids(builder) {
  this.backgroundTiles = builder.backgroundTiles;
  this.foregroundTiles = builder.foregroundTiles;
  this.enemyGrid = builder.enemyGrid;
  this.tileset = builder.tileset;

  this.shoudDrawEnemyTiles = builder.shoudDrawEnemyTiles === true;
}

AllGrids.prototype = (function() {
  return {
    drawBackgroundTile: drawBackgroundTile,
    drawEnemyTile: drawEnemyTile,
    drawForegroundTile: drawForegroundTile,
    drawWithGraphicsInRect: drawWithGraphicsInRect,
  };

  /**
   * Draws the grids inside the designated window.
   * @param {Object} graphics - The object containing drawing functions.
   * @param {Object} rect - The window indicating which tiles are drawn.
   */
  function drawWithGraphicsInRect(graphics, rect) {
    var leftMostCol = Math.floor(rect.x / TILE_WIDTH);
    var topMostRow = Math.floor(rect.y / TILE_HEIGHT);

    var colsThatFitInRect = Math.floor(rect.width / TILE_WIDTH);
    var rowsThatFitInRect = Math.floor(rect.height / TILE_HEIGHT);

    // Draw a one-cell buffer on each side
    var rightMostCol = leftMostCol + colsThatFitInRect + 2;
    var bottomMostRow = topMostRow + rowsThatFitInRect + 2;

    for (var row = topMostRow; row < bottomMostRow; row++) {
      for (var col = leftMostCol; col < rightMostCol; col++) {
        this.drawBackgroundTile(graphics, col, row);
        this.drawForegroundTile(graphics, col, row);
        this.drawEnemyTile(graphics, col, row);
      }
    }
  }

  /**
   * Draws a background tile.
   * @param {Object} graphics - The object containing drawing functions.
   * @param {number} col - The column where the tile is located.
   * @param {number} row - The row where the tile is located.
   */
  function drawBackgroundTile(graphics, col, row) {
    var tileIndex = this.backgroundTiles.indexForColAndRow(col, row);
    var tileValue = this.backgroundTiles.valueAtIndex(tileIndex);
    var leftX = col * TILE_WIDTH;
    var topY = row * TILE_HEIGHT;
    this.tileset.drawTile(graphics, tileValue, leftX, topY);
  }

  /**
   * Draws a foreground tile.
   * @param {Object} graphics - The object containing drawing functions.
   * @param {number} col - The column where the tile is located.
   * @param {number} row - The row where the tile is located.
   */
  function drawForegroundTile(graphics, col, row) {
    var tileIndex = this.foregroundTiles.indexForColAndRow(col, row);
    var tileValue = this.foregroundTiles.valueAtIndex(tileIndex);
    var leftX = col * TILE_WIDTH;
    var topY = row * TILE_HEIGHT;
    this.tileset.drawTile(graphics, tileValue, leftX, topY);
  }

  /**
   * Use this function when debugging to draw enemy spawn points.
   * @param {Object} graphics - The object containing drawing functions.
   * @param {number} col - The column where the tile is located.
   * @param {number} row - The row where the tile is located.
   */
  function drawEnemyTile(graphics, col, row) {
    if (!this.shoudDrawEnemyTiles) {
      return;
    }
    var drawingRect = new Rect2D(0, 0, CELL_WIDTH, CELL_HEIGHT);
    var obstacleValue = this.enemyGrid.valueAtColAndRow(col, row);
    if (typeof obstacleValue === 'number' && obstacleValue > ENEMY_NONE) {
      var x = col * TILE_WIDTH;
      var y = row * TILE_HEIGHT;
      var drawingRect = new Rect2D(x, y, TILE_WIDTH, TILE_HEIGHT);
      graphics.fillRect(drawingRect, 'blue');
    }
  }
})();
