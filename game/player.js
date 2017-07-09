const GROUND_FRICTION = 0.8;
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
    getX: getX,
    getY: getY,
    move: move,
    shouldCheckForEnemyCollisions: shouldCheckForEnemyCollisions,
    switchToDeathState: switchToDeathState,
  };

  // Properties

  /**
   * Gets the player's x-position.
   * @returns {Number} The player's x-position.
   */
  function getX() {
    return this.getRect().x;
  }

  /**
   * Gets the player's y-position.
   * @returns {Number} The player's y-position.
   */
  function getY() {
    return this.getRect().y;
  }

  function getRect() {
    return this.physicsObject.rect;
  }

  function getSpeed() {
    return this.physicsObject.speed;
  }

  function shouldCheckForEnemyCollisions() {
    return this.currentState.shouldCheckForEnemyCollisions();
  }

  // State Machine

  function switchToDeathState() {
    this.currentState = new PlayerDeathState();
    var speed = this.getSpeed();
    speed.x = 0;
    speed.y = -5;
  }

  // Movement

  function move(keyboard, tiles, camera) {
    this.currentState.update(this.physicsObject, keyboard, tiles, camera);
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
