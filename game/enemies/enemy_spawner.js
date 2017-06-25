function EnemySpawner() {
}

EnemySpawner.prototype = (function() {
  return {
    spawnInRect: spawnInRect,
    spawnWithValueAtPoint: spawnWithValueAtPoint,
  };

  /**
   * Pulls enemies to spawn from the grid. The grid will be altered to prevent an enemy from being spawned more than once.
   * @param {Object} grid - The grid containing enemy placement. Will be altered.
   * @param {Object} rect - The frame in which to look up enemies.
   * @returns {Object[]} - The enemies to spawn.
   */
  function spawnInRect(grid, rect) {
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var height = rect.height;

    var leftMostCol = parseInt(Math.floor(x / CELL_WIDTH)) - 1;
    var topMostRow = parseInt(Math.floor(y / CELL_HEIGHT)) - 1;

    var rightMostCol = parseInt(Math.floor((x + width) / CELL_WIDTH)) + 1;
    var bottomMostRow = parseInt(Math.floor((y + height) / CELL_HEIGHT)) + 1;

    var spawnedEnemies = [];
    for (var row = topMostRow; row < bottomMostRow; row++) {
      for (var col = leftMostCol; col < rightMostCol; col++) {
        if (!grid.isColRowInBounds(col, row)) {
          continue;
        }
        var value = grid.valueAtColAndRow(col, row);
        // TODO: use enemy constants instead
        if (value > OBSTACLE_EMPTY) {
          var spawnX = col * CELL_WIDTH;
          var spawnY = row * CELL_HEIGHT;
          var spawnPoint = new Point2D(spawnX, spawnY);
          var enemiesAtPoint = this.spawnWithValueAtPoint(value, spawnPoint);
          spawnedEnemies = spawnedEnemies.concat(enemiesAtPoint);
          grid.setValueAtColAndRow(OBSTACLE_EMPTY, col, row);
        }
      }
    }
    return spawnedEnemies;
  }

  /**
   * Creates enemy objects.
   * @param {number} value - The value indicating the enemy formation to spawn.
   * @param {Object} spawnPoint - The position to use as the origin point for the enemy formation.
   * @returns {Object[]} An array of zero or more enemies.
   */
  function spawnWithValueAtPoint(value, spawnPoint) {
    var spawnedEnemies = [];
    if (value === OBSTACLE_GOOMBA) {
      spawnedEnemies.push(new Goomba(spawnPoint));
    }
    return spawnedEnemies;
  }
})();
