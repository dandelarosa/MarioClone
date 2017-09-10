/**
 * Creates the level picker UI.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createLevelPickerUI(element) {
  var levels = [
    'cameratest',
    'enemytest1',
    'tilesettest',
    'tilesettest2',
    '1-1',
    '1-2',
    '1-3',
    '1-4',
    '2-1',
    '2-2',
    '2-3',
    '2-4',
    '3-1',
    '3-2',
    '3-3',
    '3-4',
    '4-1',
    '4-2',
    '4-3',
    '4-4',
    '5-1',
    '5-2',
    '5-3',
    '5-4',
    '6-1',
    '6-2',
    '6-3',
    '6-4',
    '7-1',
    '7-2',
    '7-3',
    '7-4',
    '8-1',
    '8-2',
    '8-3',
    '8-4',
  ];

  var levelPickerHeader = document.createTextNode('Select a Level: ');
  element.appendChild(levelPickerHeader);

  var selectElement = document.createElement('select');
  selectElement.id = 'levelSelect';
  selectElement.onchange = function() {
    levelSelected();
  };
  var storedValue = persistence.getValue('selectedWorld', 'string', '1-1');
  var indexOfStoredValue = 0;
  for (i = 0; i < levels.length; i++) {
    var levelId = levels[i];
    if (levelId === storedValue) {
      indexOfStoredValue = i;
    }
    var option = document.createElement('option');
    option.id = 'select' + levelId;
    option.value = levelId;
    option.appendChild(document.createTextNode('World ' + levelId));
    selectElement.appendChild(option);
  }
  selectElement.selectedIndex = indexOfStoredValue;
  element.appendChild(selectElement);
}

/**
 * Updates dropdown to show the row with the selected ID.
 * @param {string} levelId - The level's ID.
 */
function showLevelId(levelId) {
  var selectElement = document.getElementById('levelSelect');
  if (!selectElement) {
    return;
  }
  var options = selectElement.options;
  for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
    var optionToCheck = options[optionIndex];
    if (optionToCheck.value === levelId) {
      selectElement.selectedIndex = optionIndex;
      break;
    }
  }
}

/**
 * Handles the level selection event.
 */
function levelSelected() {
  var selectElement = document.getElementById('levelSelect');
  var selectedIndex = selectElement.selectedIndex;
  var selectedOption = selectElement.options[selectedIndex];
  var levelId = selectedOption.value;
  selectLevelWithId(levelId);
  persistence.setValue('selectedWorld', levelId);
}
