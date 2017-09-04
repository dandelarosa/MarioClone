/**
 * Creates the detail UI for background tiles.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createBackgroundTilesDetailUI(element) {
  var textField = document.createElement('input');
  textField.id = 'editor.detail.background.data';
  textField.type = 'text';
  textField.value = getDataForBackgroundTilesDetailUI();
  element.appendChild(textField);
}

/**
 * Updates the background tiles detail UI with the most recent data.
 */
function updateBackgroundTilesDetailUI() {
  var input = document.getElementById('editor.detail.background.data');
  if (!input) {
    return;
  }
  var value = getDataForBackgroundTilesDetailUI();
  input.value = value;
}

/**
 * Gets the data to display on the background tiles detail UI.
 * @returns {number[]} A list of numbers to display.
 */
function getDataForBackgroundTilesDetailUI() {
  return twoDigitHexArray(game.editorMode.allGrids.backgroundTiles.data);
}
