const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

function Level1() {
  this.bricks = new Bricks();
  this.jumper = new Jumper();
  this.camera = new Camera();
  this.camera.width = GAME_WIDTH;
  this.camera.height = GAME_HEIGHT;
  this.camera.thresholdFromCenterX = PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X;
  this.camera.thresholdFromCenterY = PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y;
  this.camera.speed = RUN_SPEED;
};

Level1.prototype.update = function(services) {
  var keyboard = services.keyboard;
  var keyEvents = keyboard.keyEvents;
  this.jumper.move(keyEvents, this.bricks);
  this.camera.follow(this.jumper, this.levelDimensions());
};

Level1.prototype.levelDimensions = function() {
  return {
    width: BRICK_COLS * BRICK_W,
    height: BRICK_ROWS * BRICK_H
  }
}

Level1.prototype.draw = function(graphics) {
  graphics.fillWholeScreen('black');

  var bricks = this.bricks;
  var jumper = this.jumper;
  var camera = this.camera;
  graphics.drawInCamera(this.camera.panX, this.camera.panY, function() {
    bricks.draw(graphics, camera);
    jumper.draw(graphics);
  });

  graphics.colorText("Arrow keys to run, spacebar to jump", 8, 14, "white");
};
