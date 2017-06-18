function displayLevelData() {
  var input = document.getElementById('levelData.data');
  var value = twoDigitHexArray(game.editorMode.gridData);
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
  game.updateLevel();
}

function displayNumCols() {
  var numColsElement = document.getElementById('levelWidth.numCols');
  numColsElement.value = game.editorMode.numCols.toString();
}

function addColumns(colsToAdd) {
  var convertedGrid = create2dArray(game.editorMode.gridData, game.editorMode.numCols);
  addColumnsToGrid(convertedGrid, colsToAdd, 0);
  var convertedBackGrid = create1dArray(convertedGrid);
  var newNumCols = game.editorMode.numCols + colsToAdd;

  game.editorMode.gridData = convertedBackGrid;
  game.editorMode.numCols = newNumCols;
  game.updateLevel();

  // Don't forget to display the changes!
  displayLevelData();
}

function deleteLastColumn() {
  var convertedGrid = create2dArray(game.editorMode.gridData, game.editorMode.numCols);
  removeLastColumnFromGrid(convertedGrid);
  var convertedBackGrid = create1dArray(convertedGrid);
  var newNumCols = game.editorMode.numCols - 1;

  game.editorMode.gridData = convertedBackGrid;
  game.editorMode.numCols = newNumCols;
  game.updateLevel();

  // Don't forget to display the changes!
  displayLevelData();
}

function selectWorld() {
  var select = document.getElementById('worldSelect');
  var selectedIndex = select.selectedIndex;
  var selectedOption = select.options[selectedIndex];
  var selectedValue = selectedOption.value;
  rememberSelectedWorld(selectedValue);

  var selectedWorld = worlds[selectedValue];
  game.loadLevel(selectedWorld);

  // Don't forget to display the changes!
  displayLevelData();
  displayObstacleData();
}

function rememberSelectedWorld(worldValue) {
  // Check for browser compatibility
  if (typeof(Storage) === "undefined") {
    return;
  }
  window.localStorage.setItem("selectedWorld", worldValue);
};

function getLastSelectedWorld() {
  // Check for browser compatibility
  if (typeof(Storage) === "undefined") {
    return null;
  }
  var storedValue = window.localStorage.getItem("selectedWorld");

  // This might need to be put into its own function. Who knows?
  var select = document.getElementById('worldSelect');
  var options = select.options;
  for (var optionIndex = 0; optionIndex < options.length; optionIndex++) {
    var optionToCheck = options[optionIndex];
    if (optionToCheck.value === storedValue) {
      select.selectedIndex = optionIndex;
    }
  }

  var selectedWorld = worlds[storedValue];
  return selectedWorld;
}
