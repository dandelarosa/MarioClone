function displayLevelData() {
  var input = document.getElementById('levelData.data');
  var value = game.gridData.toString();
  input.value = value;

  displayNumCols();
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

function displayNumCols() {
  var numColsElement = document.getElementById('levelWidth.numCols');
  numColsElement.value = game.numCols.toString();
}

function addColumns(colsToAdd) {
  console.log("Columns to add: " + colsToAdd);
  alert('Not implemented yet!');
  // TODO: turn 1D array into 2D array
  // TODO: add columns to 2D array (default value?)
  // TODO: turn 2D array back into 1D array
  // TODO: update level information
}
