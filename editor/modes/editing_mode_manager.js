/**
 * The object to use for switching between editing modes.
 * @constructor
 */
function EditingModeManager() {
  this.tileEditingMode = new TileEditingMode();
  this.obstacleEditingMode = new ObstacleEditingMode();
}

EditingModeManager.prototype = (function() {
  return {
    modeForIndex: modeForIndex,
  };

  /**
   * Gets the editing mode corresponding to the given index.
   * @param {number} index - The index representing the requested mode.
   * @returns {Object} The matching editing mode.
   */
  function modeForIndex(index) {
    switch(index) {
      case EDITING_MODE.TILES:
        return this.tileEditingMode;
        break;
      case EDITING_MODE.OBSTACLES:
        return this.obstacleEditingMode;
        break;
      default:
        return null;
        break;
    }
  }
})();
