const OBSTACLE_WIDTH = 16;
const OBSTACLE_HEIGHT = 16;

function ObstacleGrid(grid) {
}

ObstacleGrid.prototype = (function() {
  return {
    draw: draw,
  };

  // Drawing

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
    const obstacleWidth = OBSTACLE_WIDTH;
    const obstacleHeight = OBSTACLE_HEIGHT;

    var leftMostCol = Math.floor(x / obstacleWidth);
    var topMostRow = Math.floor(y / obstacleHeight);

    var colsThatFitInRect = Math.floor(width / obstacleWidth);
    var rowsThatFitInRect = Math.floor(height / obstacleHeight);

    // Draw a one-cell buffer on each side
    var rightMostCol = leftMostCol + colsThatFitInRect + 2;
    var bottomMostRow = topMostRow + rowsThatFitInRect + 2;

    for (var row = topMostRow; row < bottomMostRow; row++) {
      for (var col = leftMostCol; col < rightMostCol; col++) {
        var obstacleValue = grid.valueAtColAndRow(col, row);
        if (typeof obstacleValue === 'number' && obstacleValue > ENEMY_NONE) {
          var rectX = col * obstacleWidth;
          var rectY = row * obstacleHeight;
          var rectWidth = obstacleWidth;
          var rectHeight = obstacleHeight;
          graphics.fillRect(rectX, rectY, rectWidth, rectHeight, 'blue');
        }
      }
    }
  }
})();
