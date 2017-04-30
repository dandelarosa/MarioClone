function displayLevelData() {
  var input = document.getElementById('levelData.data');
  var value = twoDigitHexArray(game.gridData);
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
  numColsElement.value = game.numCols.toString();
}

function addColumns(colsToAdd) {
  var convertedGrid = create2dArray(game.gridData, game.numCols);
  addColumnsToGrid(convertedGrid, colsToAdd, 0);
  var convertedBackGrid = create1dArray(convertedGrid);
  var newNumCols = game.numCols + colsToAdd;

  game.gridData = convertedBackGrid;
  game.numCols = newNumCols;
  game.updateLevel();

  // Don't forget to display the changes!
  displayLevelData();
}

function deleteLastColumn() {
  var convertedGrid = create2dArray(game.gridData, game.numCols);
  removeLastColumnFromGrid(convertedGrid);
  var convertedBackGrid = create1dArray(convertedGrid);
  var newNumCols = game.numCols - 1;

  game.gridData = convertedBackGrid;
  game.numCols = newNumCols;
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
  game.loadWorld(selectedWorld);

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

function Editor() {
  this.fps = 30;
  this.width = 256;
  this.height = 240;
  this.scaleX = 2;
  this.scaleY = 2;
  this.isEditing = true;
  this.levelMockupAlpha = 0.0;
  this.tileEditingMode = new TileEditingMode();
  this.obstacleEditingMode = new ObstacleEditingMode();
  this.playerMode = new PlayerMode();
  this.editorMode = new EditorMode();
  this.currentMode = this.editorMode;

  var savedEditingMode = persistence.getValue('editingMode', 'int', EDITING_MODE.TILES);
  if (savedEditingMode === EDITING_MODE.OBSTACLES) {
    this.currentEditingMode = this.obstacleEditingMode;
  }
  else {
    this.currentEditingMode = this.tileEditingMode;
  }
};

Editor.prototype.loadWorld = function(world) {
  this.gridData = world.gridData;
  this.numCols = world.numCols;
  this.tilesetName = world.tilesetName;
  this.levelImage = getLevelImage(world.key);
  this.levelImageKey = world.key;
  this.levelImageOffset = world.levelImageOffset;
  this.obstacles = world.obstacles;
  // Not sure of the best place to put this
  if (!this.obstacles || this.obstacles.length === 0) {
    var newObstacles = [];
    for (var i = 0; i < this.gridData.length; i++) {
      newObstacles.push(OBSTACLE_EMPTY);
    }
    this.obstacles = newObstacles;
  }
  this.reset();
  this.playerMode.loadWorld(world);
  this.editorMode.loadWorld(world);
};

Editor.prototype.reset = function() {
  var grid = new Grid2D(this.gridData, this.numCols);
  var tileset = new Tileset(this.tilesetName);
  this.tiles = new TileGrid(grid, tileset);
  this.player = new Player(this.width/2, this.height/2);
  this.playerCamera = new PlayerCamera(0, 0, this.width, this.height);
  this.editorCamera = new EditorCamera(0, 0, this.width, this.height);
  this.obstacleGrid = new ObstacleGrid(this.obstacles, this.numCols);
};

Editor.prototype.updateLevel = function() {
  var grid = new Grid2D(this.gridData, this.numCols);
  var tileset = new Tileset(this.tilesetName);
  this.tiles = new TileGrid(grid, tileset);
};

Editor.prototype.switchToEditorMode = function() {
  this.isEditing = true;
  this.currentMode = this.editorMode;
};

Editor.prototype.switchToPlayerMode = function() {
  this.isEditing = false;
  this.currentMode = this.playerMode;
};

Editor.prototype.update = function() {
  var keyboard = globals.keyboard;
  var mouse = globals.mouse;
  if (keyboard.isKeyPressedThisFrame(KEY_ESC)) {
    if (this.isEditing) {
      this.switchToPlayerMode();
    }
    else {
      this.switchToEditorMode();
    }
  }

  this.currentMode.update();
  this.currentMode.draw();

  keyboard.resetKeyStateChanges();
  mouse.resetStateChange();
};
