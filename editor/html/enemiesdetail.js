/**
 * Creates the detail UI for enemies.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createEnemiesDetailUI(element) {
  var textField = document.createElement('input');
  textField.id = 'editor.detail.enemies.data';
  textField.type = 'text';
  textField.value = getDataForEnemiesDetailUI();
  element.appendChild(textField);
}

/**
 * Updates the enemies detail UI with the most recent data.
 */
function updateEnemiesDetailUI() {
  var input = document.getElementById('editor.detail.enemies.data');
  if (!input) {
    return;
  }
  var value = getDataForEnemiesDetailUI();
  input.value = value;
}

/**
 * Gets the data to display on the enemies detail UI.
 * @returns {number[]} A list of numbers to display.
 */
function getDataForEnemiesDetailUI() {
  return twoDigitHexArray(game.editorMode.allGrids.enemyGrid.data);
}
