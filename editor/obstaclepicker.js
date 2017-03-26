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
    game.obstacleEditingMode.selectedValue = selectElement.selectedIndex;
  };
}
