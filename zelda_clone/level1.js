const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

function Level1() {
  this.bricks = new Bricks();
  this.slider = new Slider();
  this.camera = new Camera();
  this.camera.width = GAME_WIDTH;
  this.camera.height = GAME_HEIGHT;
  this.camera.speed = RUN_SPEED;
};

Level1.prototype.update = function(keyEvents) {
  this.slider.move(keyEvents, this.bricks);
  this.cameraFollow(this.slider);
};

Level1.prototype.cameraFollow = function(object) {
  var cameraFocusCenterX = this.camera.panX + this.camera.width / 2;
  var cameraFocusCenterY = this.camera.panY + this.camera.height / 2;

  var playerDistFromCameraFocusX = Math.abs(object.x - cameraFocusCenterX);
  var playerDistFromCameraFocusY = Math.abs(object.y - cameraFocusCenterY);

  if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
    if(cameraFocusCenterX < object.x)  {
      this.camera.panX += this.camera.speed;
    } else {
      this.camera.panX -= this.camera.speed;
    }
  }
  if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
    if(cameraFocusCenterY < object.y)  {
      this.camera.panY += this.camera.speed;
    } else {
      this.camera.panY -= this.camera.speed;
    }
  }

  // this next code blocks the game from showing out of bounds
  // (this isn't required, if you don't mind seeing beyond edges)
  if(this.camera.panX < 0) {
    this.camera.panX = 0;
  }
  if(this.camera.panY < 0) {
    this.camera.panY = 0;
  }
  var maxPanRight = BRICK_COLS * BRICK_W - this.camera.width;
  var maxPanTop = BRICK_ROWS * BRICK_H - this.camera.height;
  if(this.camera.panX > maxPanRight) {
    this.camera.panX = maxPanRight;
  }
  if(this.camera.panY > maxPanTop) {
    this.camera.panY = maxPanTop;
  }
}

Level1.prototype.draw = function(graphics) {
  graphics.fillWholeScreen('black');

  var bricks = this.bricks;
  var slider = this.slider;
  var camera = this.camera;
  graphics.drawInCamera(this.camera.panX, this.camera.panY, function() {
    bricks.draw(graphics, camera);
    slider.draw(graphics);
  });

  graphics.colorText("Arrow keys to slide, scrolling demo", 8, 14, 'white');
};
