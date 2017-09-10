/**
 * The mode to use for editing background tiles.
 * @class
 */
function BackgroundEditingMode() {
  this.displayText = 'Editing Background Tiles';
  this.selectedTileValue = persistence.getValue('lastBackgroundTileSelected', 'int', TILE_V2_EMPTY);
}

BackgroundEditingMode.prototype = (function() {
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
    editor.allGrids.backgroundTiles.setValueAtColAndRow(this.selectedTileValue, col, row);
    updateBackgroundTilesDetailUI();
  }

  /**
   * Handles the selection of a tile value.
   * @param {number} newValue - The selected tile value.
   */
  function handleSelectedValue(newValue) {
    this.selectedTileValue = newValue;
    persistence.setValue('lastBackgroundTileSelected', newValue);
  }
})();
