function ObstacleGrid(grid) {
}

ObstacleGrid.prototype = (function() {
  return {
    draw: draw,
  };

  /**
   * Draws placeholder graphics for enemies in the level editor.
   * @param {number} x - The camera's x position.
   * @param {number} y - The camera's y position.
   * @param {number} width - The camera's width.
   * @param {number} height - The camera's height.
   * @param {Object} graphics - The object responsible for drawing graphics on the screen.
   * @param {Object} grid - The grid containing enemy placement information.
   */
  function draw(x, y, width, height, graphics, grid) {
    var leftMostCol = Math.floor(x / CELL_WIDTH);
    var topMostRow = Math.floor(y / CELL_HEIGHT);

    var colsThatFitInRect = Math.floor(width / CELL_WIDTH);
    var rowsThatFitInRect = Math.floor(height / CELL_HEIGHT);

    // Draw a one-cell buffer on each side
    var rightMostCol = leftMostCol + colsThatFitInRect + 2;
    var bottomMostRow = topMostRow + rowsThatFitInRect + 2;

    var drawingRect = new Rect2D(0, 0, CELL_WIDTH, CELL_HEIGHT);
    for (var row = topMostRow; row < bottomMostRow; row++) {
      for (var col = leftMostCol; col < rightMostCol; col++) {
        var obstacleValue = grid.valueAtColAndRow(col, row);
        if (typeof obstacleValue === 'number' && obstacleValue > ENEMY_NONE) {
          drawingRect.x = col * CELL_WIDTH;
          drawingRect.y = row * CELL_HEIGHT;
          graphics.fillRect(drawingRect, 'blue');
        }
      }
    }
  }
})();
