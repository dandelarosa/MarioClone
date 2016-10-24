function Camera() {
  this.panX = 0.0;
  this.panY = 0.0;
  this.speed = 0;
  this.width = 0;
  this.height = 0;
  this.thresholdFromCenterX = 0;
  this.thresholdFromCenterY = 0;
};

Camera.prototype.follow = function(object, levelDimensions) {
  var cameraFocusCenterX = this.panX + this.width / 2;
  var cameraFocusCenterY = this.panY + this.height / 2;

  var playerDistFromCameraFocusX = Math.abs(object.x - cameraFocusCenterX);
  var playerDistFromCameraFocusY = Math.abs(object.y - cameraFocusCenterY);

  if (playerDistFromCameraFocusX > this.thresholdFromCenterX) {
    if (cameraFocusCenterX < object.x) {
      this.panX += this.speed;
    }
    else {
      this.panX -= this.speed;
    }
  }
  if (playerDistFromCameraFocusY > this.thresholdFromCenterY) {
    if(cameraFocusCenterY < object.y) {
      this.panY += this.speed;
    }
    else {
      this.panY -= this.speed;
    }
  }

  // this next code blocks the game from showing out of bounds
  // (this isn't required, if you don't mind seeing beyond edges)
  if (this.panX < 0) {
    this.panX = 0;
  }
  if (this.panY < 0) {
    this.panY = 0;
  }
  var maxPanRight = levelDimensions.width - this.width;
  var maxPanTop = levelDimensions.height - this.height;
  if (this.panX > maxPanRight) {
    this.panX = maxPanRight;
  }
  if (this.panY > maxPanTop) {
    this.panY = maxPanTop;
  }
}
