/**
 * The mode to use for editing foreground tiles.
 * @class
 */
function ForegroundEditingMode() {
  this.displayText = 'Editing Foreground Tiles';
  this.selectedTileValue = persistence.getValue('lastForegroundTileSelected', 'int', TILE_V2_EMPTY);
}

ForegroundEditingMode.prototype = (function() {
  return {
    handleClickAtColRow: handleClickAtColRow,
    handleSelectedValue: handleSelectedValue,
    valueAtColRow: valueAtColRow,
  }

  /**
   * Gets the current value at the mouse's location.
   * @param {number} col - The index of the column clicked on.
   * @param {number} row - The index of the row clicked on.
   * @param {Object} editor - The object managing the level editing.
   */
  function valueAtColRow(col, row, editor) {
    var grid = editor.allGrids.foregroundTiles;
    return grid.valueAtColAndRow(col, row);
  }

  /**
   * Handles clicks on the grid.
   * @param {number} col - The index of the column clicked on.
   * @param {number} row - The index of the row clicked on.
   * @param {Object} editor - The object managing the level editing.
   */
  function handleClickAtColRow(col, row, editor) {
    editor.allGrids.foregroundTiles.setValueAtColAndRow(this.selectedTileValue, col, row);
    updateForegroundTilesDetailUI();
  }

  /**
   * Handles the selection of a tile value.
   * @param {number} newValue - The selected tile value.
   */
  function handleSelectedValue(newValue) {
    this.selectedTileValue = newValue;
    persistence.setValue('lastForegroundTileSelected', newValue);
  }
})();
