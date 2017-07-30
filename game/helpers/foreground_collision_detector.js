/**
 * Handles collisions between the foreground tiles and physics objects.
 * @class
 */
function ForegroundCollisionDetector(foregroundTiles) {
  this.foregroundTiles = foregroundTiles;
}

ForegroundCollisionDetector.prototype = (function() {
  return {
    handleCollisionsWith: handleCollisionsWith,
    handleHorizontalCollisions: handleHorizontalCollisions,
    isSolidAtPoint: isSolidAtPoint,
    tileValueAtPoint: tileValueAtPoint,
  };

  /**
   * Handles collisions with the given object.
   * @param {Object} physicsObject - The object for which to detect collisions. This object's properties will be modified if a collision is detected.
   */
  function handleCollisionsWith(physicsObject) {
    var rect = physicsObject.rect;
    var speed = physicsObject.speed;

    var topY = rect.y;
    var bottomY = rect.y + rect.height;
    var leftX = rect.x;
    var rightX = rect.x + rect.width;
    var futureTopY = topY + speed.y;
    var futureBottomY = bottomY + speed.y;
    var futureLeftX = leftX + speed.x;
    var futureRightX = rightX + speed.x;

    // If future top side is inside a wall, push to row below
    if (speed.y < 0 && this.isSolidAtPoint(rect.x, futureTopY)) {
      rect.y = Math.floor(rect.y / TILE_HEIGHT) * TILE_HEIGHT;
      speed.y = 0.0;
    }
    else if (speed.y < 0 && this.isSolidAtPoint(rightX - 1, futureTopY)) {
      rect.y = Math.floor(rect.y / TILE_HEIGHT) * TILE_HEIGHT;
      speed.y = 0.0;
    }
    // If future bottom side is inside a wall, push to row above
    else if (speed.y > 0 && this.isSolidAtPoint(leftX, futureBottomY)) {
      rect.y = (Math.floor(futureBottomY / TILE_HEIGHT)) * TILE_HEIGHT - rect.height;
      physicsObject.onGround = true;
      speed.y = 0;
    }
    else if (speed.y > 0 && this.isSolidAtPoint(rightX - 1, futureBottomY)) {
      rect.y = (Math.floor(futureBottomY / TILE_HEIGHT)) * TILE_HEIGHT - rect.height;
      physicsObject.onGround = true;
      speed.y = 0;
    }
    else if (this.isSolidAtPoint(rect.x, rect.y + rect.height + 2) == 0) {
      physicsObject.onGround = false;
    }

    // If left side is already inside a wall, push to the column to the right
    if (speed.x < 0 && (this.isSolidAtPoint(futureLeftX, topY))) {
      rect.x = Math.floor(leftX / TILE_WIDTH) * TILE_WIDTH;
      this.handleHorizontalCollisions(physicsObject);
    }
    else if (speed.x < 0 && (this.isSolidAtPoint(futureLeftX, bottomY - 1))) {
      rect.x = Math.floor(leftX / TILE_WIDTH) * TILE_WIDTH;
      this.handleHorizontalCollisions(physicsObject);
    }
    // If right side is already inside a wall, push to the column to the left
    else if (speed.x > 0 && (this.isSolidAtPoint(futureRightX, topY))) {
      rect.x = Math.ceil(rightX / TILE_WIDTH) * TILE_WIDTH - rect.width;
      this.handleHorizontalCollisions(physicsObject);
    }
    else if (speed.x > 0 && (this.isSolidAtPoint(futureRightX, bottomY - 1))) {
      rect.x = Math.ceil(rightX / TILE_WIDTH) * TILE_WIDTH - rect.width;
      this.handleHorizontalCollisions(physicsObject);
    }
  }

  /**
   * Checks if the tile at the given point is solid.
   * @param {number} x - The x position to check.
   * @param {number} y - The y position to check.
   * @returns {boolean} true if the tile is solid, false if not.
   */
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
  }

  /**
   * Gets the value of the tile at the given point.
   * @param {number} x - The x position to check.
   * @param {number} y - The y position to check.
   * @returns {number} The tile value at the given point.
   */
  function tileValueAtPoint(x, y) {
    var col = Math.floor(x / TILE_WIDTH);
    var row = Math.floor(y / TILE_HEIGHT);

    if(col < 0 || col >= this.foregroundTiles.numCols ||
       row < 0 || row >= this.foregroundTiles.numRows) {
       return TILE_OUT_OF_BOUNDS;
    }

    return this.foregroundTiles.valueAtColAndRow(col, row);
  }

  function handleHorizontalCollisions(physicsObject) {
    if (physicsObject.bouncesHorizontal) {
      physicsObject.speed.x *= -1;
    }
    else {
      physicsObject.speed.x = 0;
    }
  }
})();
