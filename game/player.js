const GROUND_FRICTION = 0.8;
const AIR_RESISTANCE = 0.95;
const RUN_SPEED = 4.0;
const JUMP_POWER = 9.0;
const GRAVITY = 0.6;

var JUMPER_RADIUS = 10;

function Player(x, y) {
  var rect = new Rect2D(x, y, 16, 16);
  var speed = new Vector2D(0, 0);
  this.physicsObject = new PhysicsObject2D(rect, speed);
  this.currentState = new PlayerRegularState();
};

Player.prototype = (function() {
  return {
    draw: draw,
    drawBoundingBox: drawBoundingBox,
    getRect: getRect,
    getSpeed: getSpeed,
    move: move,
  };

  // Properties

  function getRect() {
    return this.physicsObject.rect;
  }

  function getSpeed() {
    return this.physicsObject.speed;
  }

  // Movement

  function move(keyboard, tiles) {
    this.currentState.update(this.physicsObject, keyboard, tiles);
  }

  // Drawing

  function draw(graphics) {
    this.drawBoundingBox(graphics);
  }

  function drawBoundingBox(graphics) {
    var rect = this.getRect();
    graphics.fillRect(rect.x, rect.y, rect.width, rect.height, 'white');
  }
})();
