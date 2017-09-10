/**
 * Creates the detail UI for enemies.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createEnemiesDetailUI(element) {
  var enemies = [
    {value: ENEMY_NONE, displayText: 'Empty'},
    {value: ENEMY_GOOMBA, displayText: 'Goomba'},
    {value: ENEMY_DOUBLE_GOOMBA, displayText: 'Two Goombas (half a space apart)'},
  ];

  var selectElement = document.createElement('select');
  selectElement.id = 'enemySelect';
  selectElement.onchange = selectEnemy;

  var storedValue = game.editorMode.editingModeManager.enemyEditingMode.selectedValue;
  var indexOfStoredValue = 0;
  for (var i = 0; i < enemies.length; i++) {
    var item = enemies[i];
    var value = item.value;
    var optionElement = document.createElement('option');
    optionElement.value = value;
    if (value === storedValue) {
      indexOfStoredValue = i;
    }
    var optionText = document.createTextNode(item.displayText);
    optionElement.appendChild(optionText);

    selectElement.appendChild(optionElement);
  }
  selectElement.selectedIndex = indexOfStoredValue;
  element.appendChild(selectElement);

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

/**
 * Handles the selection of an enemy.
 */
function selectEnemy() {
  var select = document.getElementById('enemySelect');
  var selectedIndex = select.selectedIndex;
  var selectedOption = select.options[selectedIndex];
  var selectedValue = parseInt(selectedOption.value);
  game.editorMode.editingModeManager.enemyEditingMode.handleSelectedValue(selectedValue);
}
