/**
 * Handles the mouse state in the editor mode.
 * @class
 */
function EditorMouse() {
  // Keep undefined until the mouse moves inside the canvas
  this.x = undefined;
  this.y = undefined;
  this.col = undefined;
  this.row = undefined;
  this.value = undefined;
}

EditorMouse.prototype = (function() {
  return {
    draw: draw,
  }

  /**
   * Draws the debugging information.
   * @param {Object} graphics - The graphics object.
   */
  function draw(graphics) {
    if (this.value === undefined) {
      return;
    }

    var mouseColRowText = '(' + this.col + ', ' + this.row + ')';
    graphics.fillText(mouseColRowText, this.x + 5, this.y, 'yellow');

    var displayValue = twoDigitHexString(this.value);
    graphics.fillText(displayValue, this.x + 15, this.y + 15, 'yellow');
  }
})();
