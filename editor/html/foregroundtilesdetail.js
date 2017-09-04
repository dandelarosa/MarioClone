/**
 * Creates the detail UI for foreground tiles.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createForegroundTilesDetailUI(element) {
  var textField = document.createElement('input');
  textField.id = 'editor.detail.foreground.data';
  textField.type = 'text';
  textField.value = getDataForForegroundTilesDetailUI();
  element.appendChild(textField);
}

/**
 * Updates the foreground tiles detail UI with the most recent data.
 */
function updateForegroundTilesDetailUI() {
  var input = document.getElementById('editor.detail.foreground.data');
  if (!input) {
    return;
  }
  var value = getDataForForegroundTilesDetailUI();
  input.value = value;
}

/**
 * Gets the data to display on the foreground tiles detail UI.
 * @returns {number[]} A list of numbers to display.
 */
function getDataForForegroundTilesDetailUI() {
  return twoDigitHexArray(game.editorMode.allGrids.foregroundTiles.data);
}
