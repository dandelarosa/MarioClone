/**
 * Handles collisions between the level's bounds and the physics objects.
 * @class
 */
function LevelCollisionDetector(foregroundTiles) {
  this.levelWidth = TILE_WIDTH * foregroundTiles.numCols;
  this.levelHeight = TILE_HEIGHT * foregroundTiles.numRows;
}

LevelCollisionDetector.prototype = (function() {
  return {
    handleCollisionsWith: handleCollisionsWith,
    updateWithGrid: updateWithGrid,
  };

  /**
   * Handles collisions with the given object.
   * @param {Object} physicsObject - The object for which to detect collisions. This object's properties will be modified if a collision is detected.
   */
  function handleCollisionsWith(physicsObject) {
    var rect = physicsObject.getRect();
    var speed = physicsObject.getSpeed();

    var leftX = rect.x;
    var rightX = rect.x + rect.width;

    if (speed.x < 0 && leftX <= 0) {
      rect.x = 0;
      speed.x = 0.0;
    }
    else if (speed.x > 0 && rightX >= this.levelWidth) {
      rect.x = this.levelWidth - rect.width;
      speed.x = 0.0;
    }
  }

  /**
   * Updates the level's dimensions with new tile grid.
   * @param {Object} grid - The grid used to calculate the level's dimensions.
   */
  function updateWithGrid(grid) {
    this.levelWidth = TILE_WIDTH * grid.numCols;
    this.levelHeight = TILE_HEIGHT * grid.numRows;
  }
})();
