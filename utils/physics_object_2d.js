/**
 * An object containing a collision box and a velocity.
 * @constructor
 * @param {Object} rect - the object's bounding box.
 * @param {Object} speed - a speed object with an x and y component.
 */
function PhysicsObject2D(rect, speed) {
  this.rect = rect;
  this.speed = speed;
  this.onGround = false;
}

PhysicsObject2D.prototype = (function() {
  return {
    getRect: getRect,
    getSpeed: getSpeed,
  };

  function getRect() {
    return this.rect;
  }

  function getSpeed() {
    return this.speed;
  }
})();
