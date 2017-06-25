function createObstacleDataForm() {
  var obstacleDataTextField = document.createElement('input');
  obstacleDataTextField.id = 'obstacleData.data';
  obstacleDataTextField.type = 'text';
  var obstacleDataDiv = document.getElementById('obstacleData');
  obstacleDataDiv.appendChild(obstacleDataTextField);
}

function displayObstacleData() {
  var input = document.getElementById('obstacleData.data');
  var value = twoDigitHexArray(game.editorMode.enemyGrid.getData());
  input.value = value;
}
