var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

function Level1() {
  this.bricks = new Bricks();
  this.slider = new Slider();
};

Level1.prototype.update = function(keyEvents) {
  this.slider.move(keyEvents, this.bricks);
  this.cameraFollow(this.slider);
};

Level1.prototype.cameraFollow = function(object) {
  var cameraFocusCenterX = camPanX + GAME_WIDTH / 2;
  var cameraFocusCenterY = camPanY + GAME_HEIGHT / 2;

  var playerDistFromCameraFocusX = Math.abs(object.x - cameraFocusCenterX);
  var playerDistFromCameraFocusY = Math.abs(object.y - cameraFocusCenterY);

  if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
    if(cameraFocusCenterX < object.x)  {
      camPanX += RUN_SPEED;
    } else {
      camPanX -= RUN_SPEED;
    }
  }
  if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
    if(cameraFocusCenterY < object.y)  {
      camPanY += RUN_SPEED;
    } else {
      camPanY -= RUN_SPEED;
    }
  }

  // this next code blocks the game from showing out of bounds
  // (this isn't required, if you don't mind seeing beyond edges)
  if(camPanX < 0) {
    camPanX = 0;
  }
  if(camPanY < 0) {
    camPanY = 0;
  }
  var maxPanRight = BRICK_COLS * BRICK_W - GAME_WIDTH;
  var maxPanTop = BRICK_ROWS * BRICK_H - GAME_HEIGHT;
  if(camPanX > maxPanRight) {
    camPanX = maxPanRight;
  }
  if(camPanY > maxPanTop) {
    camPanY = maxPanTop;
  }
}

Level1.prototype.draw = function(graphics) {
  graphics.fillWholeScreen('black');

  var bricks = this.bricks;
  var slider = this.slider;
  graphics.drawInCamera(camPanX, camPanY, function() {
    bricks.draw(graphics);
    slider.draw(graphics);
  });

  graphics.colorText("Arrow keys to slide, scrolling demo", 8, 14, 'white');
};
