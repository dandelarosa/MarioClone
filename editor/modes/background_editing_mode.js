/**
 * The mode to use for editing background tiles.
 * @class
 */
function BackgroundEditingMode() {
  this.displayText = 'Editing Background Tiles';
}

BackgroundEditingMode.prototype = (function() {
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
    editor.allGrids.backgroundTiles.setValueAtColAndRow(col, row, this.selectedTileValue);
    editor.gridData = game.allGrids.backgroundTiles.getGridData();
    displayLevelData();
  }
})();
