/**
 * A helper object for determining whether two objects exist.
 */
function CollisionDetector() {
}

CollisionDetector.prototype = (function () {
  return {
    objectCollidesWithGroup: objectCollidesWithGroup,
    objectsCollide: objectsCollide,
  };

  /**
   * Checks if the object collides with an object in the given group.
   * @param {Object} object - The lone object to look up.
   * @param {Object[]} group - A group of objects to look up.
   * @returns true if the object collides with any object in the group, false if not.
   */
  function objectCollidesWithGroup(object, group) {
    for (var i = 0; i < group.length; i++) {
      var object2 = group[i];
      if (this.objectsCollide(object, object2)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if an object collides with another object.
   * @param {Object} object1 - The first object.
   * @param {Object} object2 - The second object.
   * @returns true if the objects collides, false if not.
   */
  function objectsCollide(object1, object2) {
    var rect1 = object1.getRect();
    var rect1left = rect1.x;
    var rect1right = rect1.x + rect1.width;
    var rect1top = rect1.y;
    var rect1bottom = rect1.y + rect1.height;

    var rect2 = object2.getRect();
    var rect2left = rect2.x;
    var rect2right = rect2.x + rect2.width;
    var rect2top = rect2.y;
    var rect2bottom = rect2.y + rect2.height;

    if (rect1left >= rect2right) {
      return false;
    }
    else if (rect1right <= rect2left) {
      return false;
    }
    else if (rect1top >= rect2bottom) {
      return false;
    }
    else if (rect1bottom <= rect2top) {
      return false;
    }
    else {
      return true;
    }
  }
})();
