const OBSTACLE_WIDTH = 16;
const OBSTACLE_HEIGHT = 16;

function ObstacleGrid(data, numCols) {
  this.grid = new Grid2D(data, numCols);
  this.enemySpawner = new EnemySpawner();
}

ObstacleGrid.prototype = (function() {
  return {
    draw: draw,
    getData: getData,
    grabObstaclesInRect: grabObstaclesInRect,
    setValueAtColAndRow: setValueAtColAndRow,
  };

  // Querying Data

  function getData() {
    return this.grid.getData();
  }

  // Modifying Data

  function setValueAtColAndRow(value, col, row) {
    this.grid.setValueAtColAndRow(value, col, row);
  }

  function grabObstaclesInRect(x, y, width, height) {
    var leftMostCol = parseInt(Math.floor(x / OBSTACLE_WIDTH)) - 1;
    var topMostRow = parseInt(Math.floor(y / OBSTACLE_HEIGHT)) - 1;

    var rightMostCol = parseInt(Math.floor((x + width) / OBSTACLE_WIDTH)) + 1;
    var bottomMostRow = parseInt(Math.floor((y + height) / OBSTACLE_HEIGHT)) + 1;

    var obstaclesInRect = [];
    for (var row = topMostRow; row < bottomMostRow; row++) {
      for (var col = leftMostCol; col < rightMostCol; col++) {
        if (!this.grid.isColRowInBounds(col, row)) {
          continue;
        }
        var obstacleValue = this.grid.valueAtColAndRow(col, row);
        if (obstacleValue > OBSTACLE_EMPTY) {
          var spawnX = col * OBSTACLE_WIDTH;
          var spawnY = row * OBSTACLE_HEIGHT;
          var spawnPoint = new Point2D(spawnX, spawnY);
          var spawnedObstacles = this.enemySpawner.spawnWithValueAtPoint(obstacleValue, spawnPoint);
          obstaclesInRect = obstaclesInRect.concat(spawnedObstacles);
          this.grid.setValueAtColAndRow(OBSTACLE_EMPTY, col, row);
        }
      }
    }
    return obstaclesInRect;
  }

  // Drawing

  function draw(x, y, width, height, graphics) {
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
        var obstacleValue = this.grid.valueAtColAndRow(col, row);
        if (typeof obstacleValue === 'number' && obstacleValue > OBSTACLE_EMPTY) {
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
