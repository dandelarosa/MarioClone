
function PlayerCamera(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 4;
  this.thresholdFromCenterX = 25;
}

PlayerCamera.prototype.follow = function(player, bricks) {
  var cameraCenterX = this.x + this.width / 2;
  var playerDistFromCameraFocusX = Math.abs(player.x - cameraCenterX);
  if (playerDistFromCameraFocusX > this.thresholdFromCenterX) {
    if (cameraCenterX < player.x) {
      this.x += this.speed;
    }
    else {
      this.x -= this.speed;
    }
  }

  // this next code blocks the game from showing out of bounds
  // (this isn't required, if you don't mind seeing beyond edges)
  if (this.x < bricks.minX()) {
    this.x = bricks.minX();
  }
  if (this.y < bricks.minY()) {
    this.y = bricks.minY();
  }
  var maxPanRight = bricks.maxX() - this.width;
  var maxPanTop = bricks.maxY() - this.height;
  if (this.x > maxPanRight) {
    this.x = maxPanRight;
  }
  if (this.y > maxPanTop) {
    this.y = maxPanTop;
  }
}
