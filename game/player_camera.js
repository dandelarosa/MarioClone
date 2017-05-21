
function PlayerCamera(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.leftSnapThreshold = 103;
  this.rightSnapThreshold = 153;
}

PlayerCamera.prototype.follow = function(player, tiles) {
  // Values relative to the camera
  var leftSnapThreshold = this.leftSnapThreshold ;
  var rightSnapThreshold = this.rightSnapThreshold;
  var cameraCenterX = this.x + this.width / 2;

  var rect2 = player.rect;

  // Left camera threshold
  if (rect2.x < this.x + leftSnapThreshold) {
    this.x = rect2.x - leftSnapThreshold;
  }
  // Right camera threshold
  else if (rect2.x + rect2.width > this.x + rightSnapThreshold) {
    this.x = rect2.x + rect2.width - rightSnapThreshold;
  }

  // this next code blocks the game from showing out of bounds
  // (this isn't required, if you don't mind seeing beyond edges)
  if (this.x < tiles.minX()) {
    this.x = tiles.minX();
  }
  if (this.y < tiles.minY()) {
    this.y = tiles.minY();
  }
  var maxPanRight = tiles.maxX() - this.width;
  var maxPanTop = tiles.maxY() - this.height;
  if (this.x > maxPanRight) {
    this.x = maxPanRight;
  }
  if (this.y > maxPanTop) {
    this.y = maxPanTop;
  }
}
