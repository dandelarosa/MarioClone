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
    valueAtColRow: valueAtColRow,
  }

  /**
   * Gets the current value at the mouse's location.
   * @param {number} col - The index of the column clicked on.
   * @param {number} row - The index of the row clicked on.
   * @param {Object} editor - The object managing the level editing.
   */
  function valueAtColRow(col, row, editor) {
    var grid = editor.allGrids.backgroundTiles;
    return grid.valueAtColAndRow(col, row);
  }

  /**
   * Handles clicks on the grid.
   * @param {number} col - The index of the column clicked on.
   * @param {number} row - The index of the row clicked on.
   * @param {Object} editor - The object managing the level editing.
   */
  function handleClickAtColRow(col, row, editor) {
    editor.allGrids.foregroundTiles.setValueAtColAndRow(col, row, this.selectedTileValue);
    editor.gridData = game.allGrids.foregroundTiles.getGridData();
    displayLevelData();
  }
})();
