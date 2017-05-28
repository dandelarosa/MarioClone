/**
 * A helper object for determining whether two objects exist.
 */
function CollisionDetector() {
}

CollisionDetector.prototype = (function () {
  return {
    objectCollidesWithGroup: objectCollidesWithGroup,
  };

  /**
   * Checks if the object collides with an object in the given group.
   * @param {Object} object - The lone object to look up.
   * @param {Object[]} group - A group of objects to look up.
   * @returns true if the object collides with any object in the group, false if not.
   */
  function objectCollidesWithGroup(object, group) {
    var rect1 = object.getRect();
    for (var i = 0; i < group.length; i++) {
      var rect1left = rect1.x;
      var rect1right = rect1.x + rect1.width;
      var rect1top = rect1.y;
      var rect1bottom = rect1.y + rect1.height;

      var object2 = group[i];
      var rect2 = object2.getRect();
      var rect2left = rect2.x;
      var rect2right = rect2.x + rect2.width;
      var rect2top = rect2.y;
      var rect2bottom = rect2.y + rect2.height;

      if (rect1left >= rect2right) {
        continue;
      }
      else if (rect1right <= rect2left) {
        continue;
      }
      else if (rect1top >= rect2bottom) {
        continue;
      }
      else if (rect1bottom <= rect2top) {
        continue;
      }
      else {
        return true;
      }
    }
    return false;
  }
})();
