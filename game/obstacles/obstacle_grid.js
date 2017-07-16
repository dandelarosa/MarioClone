function ObstacleGrid(grid) {
}

ObstacleGrid.prototype = (function() {
  return {
    drawInRect: drawInRect,
  };

  /**
   * Draws placeholder graphics for enemies in the level editor.
   * @param {Object} rect - The camera's frame.
   * @param {Object} graphics - The object responsible for drawing graphics on the screen.
   * @param {Object} grid - The grid containing enemy placement information.
   */
  function drawInRect(rect, graphics, grid) {
    var leftMostCol = Math.floor(rect.x / CELL_WIDTH);
    var topMostRow = Math.floor(rect.y / CELL_HEIGHT);

    var colsThatFitInRect = Math.floor(rect.width / CELL_WIDTH);
    var rowsThatFitInRect = Math.floor(rect.height / CELL_HEIGHT);

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
