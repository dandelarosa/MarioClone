/**
 * The mode to use for editing foreground tiles.
 * @class
 */
function ForegroundEditingMode() {
  this.displayText = 'Editing Foreground Tiles';
}

ForegroundEditingMode.prototype = (function() {
  return {
    handleClickAtColRow: handleClickAtColRow,
  }

  /**
   * Handles clicks on the grid.
   * @param {number} col - The index of the column clicked on.
   * @param {number} row - The index of the row clicked on.
   * @param {Object} editor - The object managing the level editing.
   */
  function handleClickAtColRow(col, row, editor) {
    // TODO: implement for real
  }
})();
