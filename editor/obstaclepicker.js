function createObstaclePicker() {
  var options = [
    {displayText: 'Empty', value: OBSTACLE_EMPTY},
    {displayText: 'Goomba', value: OBSTACLE_GOOMBA},
  ];
  var obstaclePickerDiv = document.getElementById('obstaclePicker');
  var promptText = document.createTextNode('Select an Obstacle:');
  obstaclePickerDiv.appendChild(promptText);
  var selectElement = document.createElement('select');
  selectElement.id = 'obstacleSelect';
  obstaclePickerDiv.appendChild(selectElement);
  options.forEach(function(option) {
    var optionElement = document.createElement('option');
    optionElement.value = option.value;
    var optionText = document.createTextNode(option.displayText);
    optionElement.appendChild(optionText);
    selectElement.appendChild(optionElement);
  });
  selectElement.onchange = function() {
    obstaclePickerOnchange(selectElement);
  };

  var storedValue = persistence.getValue('lastObstacleSelected', 'int', OBSTACLE_EMPTY);
  var indexOfStoredValue = 0;
  for (var i = 0; i < options.length; i++) {
    if (options[i].value === storedValue) {
      indexOfStoredValue = i;
      break;
    }
  }
  selectElement.selectedIndex = indexOfStoredValue;
}

function obstaclePickerOnchange(selectElement) {
  var selectedIndex = selectElement.selectedIndex;
  var selectedOption = selectElement.options[selectedIndex];
  var selectedValue = parseInt(selectedOption.value);
  game.obstacleEditingMode.selectedValue = selectedValue;
  persistence.setValue('lastObstacleSelected', selectedValue);
}
