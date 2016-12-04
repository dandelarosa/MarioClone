function displayLevelData() {
  var input = document.getElementById('levelData.data');
  var value = game.gridData.toString();
  input.value = value;
}

function updateLevelData() {
  var input = document.getElementById('levelData.data');
  var value = input.value;
  var data = value.split(',');
  var finalData = [];
  for (var i = 0; i < data.length; i++) {
    finalData.push(parseInt(data[i]));
  }
  game.gridData = finalData;
  game.reset();
}
