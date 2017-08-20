/**
 * The object to use for switching between editing modes.
 * @constructor
 */
function EditingModeManager() {
  this.backgroundEditingMode = new BackgroundEditingMode();
  this.foregroundEditingMode = new ForegroundEditingMode();
  this.enemyEditingMode = new EnemyEditingMode();
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
      case EDITING_MODE.BACKGROUND:
        return this.backgroundEditingMode;
        break;
      case EDITING_MODE.FOREGROUND:
        return this.foregroundEditingMode;
        break;
      case EDITING_MODE.ENEMIES:
        return this.enemyEditingMode;
        break;
      default:
        return null;
        break;
    }
  }
})();
