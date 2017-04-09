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
};

Editor.prototype.reset = function() {
  var gridBuilder = new GridBuilder(this.numCols, this.gridData);
  var grid = new Grid(gridBuilder);
  var tileset = new Tileset(this.tilesetName);
  this.bricks = new Bricks(grid, tileset);
  this.player = new Player(this.width/2, this.height/2);
  this.playerCamera = new PlayerCamera(0, 0, this.width, this.height);
  this.editorCamera = new EditorCamera(0, 0, this.width, this.height);
  this.obstacleGrid = new ObstacleGrid(this.obstacles, this.numCols);
};

Editor.prototype.updateLevel = function() {
  var gridBuilder = new GridBuilder(this.numCols, this.gridData);
  var grid = new Grid(gridBuilder);
  var tileset = new Tileset(this.tilesetName);
  this.bricks = new Bricks(grid, tileset);
};

Editor.prototype.switchToEditorMode = function() {
  this.isEditing = true;
};

Editor.prototype.switchToPlayerMode = function() {
  this.isEditing = false;
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

  if (this.isEditing) {
    this.updateEditorMode();
  }
  else {
    this.updatePlayerMode();
  }

  keyboard.resetKeyStateChanges();
  mouse.resetStateChange();
};

Editor.prototype.updateEditorMode = function() {
  var keyboard = globals.keyboard;

  if (keyboard.isKeyPressedThisFrame(KEY_0)) {
    if (this.levelMockupAlpha === 0.0) {
      this.levelMockupAlpha = 0.5;
    }
    else {
      this.levelMockupAlpha = 0.0;
    }
  }

  if (keyboard.isKeyPressedThisFrame(KEY_1)) {
    if (this.currentEditingMode == this.tileEditingMode) {
      this.currentEditingMode = this.obstacleEditingMode;
      setStoredValue('editingMode', EDITING_MODE.OBSTACLES);
    }
    else {
      this.currentEditingMode = this.tileEditingMode;
      setStoredValue('editingMode', EDITING_MODE.TILES);
    }
  }

  var camera = this.editorCamera;
  this.editorCamera.update(keyboard, this.bricks);

  var mouse = globals.mouse;
  var mouseX = mouse.x;
  var mouseY = mouse.y;
  var mousePlusCameraX = mouse.x / 2 + camera.x;
  var mousePlusCameraY = mouse.y / 2 + camera.y;
  var mouseCol = this.bricks.colForPixelX(mousePlusCameraX);
  var mouseRow = this.bricks.rowForPixelY(mousePlusCameraY);
  if (mouse.isPressedThisFrame()) {
    this.currentEditingMode.handleClickAtColRow(mouseCol, mouseRow, this);
  }

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.editorCamera.x, -this.editorCamera.y);
  this.bricks.drawBricksInRect(camera.x, camera.y, camera.width,
    camera.height, graphics);
  this.obstacleGrid.draw(camera.x, camera.y, camera.width,
    camera.height, graphics);
  if (levelImageLoaded[this.levelImageKey]) {
    graphics.drawImageWithAlpha(this.levelImage, -this.levelImageOffset, 0,
      this.levelMockupAlpha);
  }
  graphics.popState();
  graphics.popState();

  graphics.fillText('Editor Mode', 5, 15, 'yellow');
  graphics.fillText(this.currentEditingMode.displayText, 5, 25, 'yellow');

  graphics.fillText('Press 0 to toggle level mockup', 370, 15, 'yellow');

  var mouseColRowText = '(' + mouseCol + ', ' + mouseRow + ')';
  graphics.fillText(mouseColRowText, mouseX + 5, mouseY, 'yellow');

  var value = this.bricks.tileValueAtColRow(mouseCol, mouseRow);
  graphics.fillText(twoDigitHexString(value), mouseX + 15, mouseY + 15, 'yellow');
};

Editor.prototype.updatePlayerMode = function() {
  var keyboard = globals.keyboard;
  this.player.move(keyboard, this.bricks);

  var camera = this.playerCamera;
  camera.follow(this.player, this.bricks);

  var graphics = globals.graphics;
  graphics.pushState();
  graphics.scale(this.scaleX, this.scaleY);
  graphics.fillCanvas('black');

  graphics.pushState();
  graphics.translate(-this.playerCamera.x, -this.playerCamera.y);
  this.bricks.drawBricksInRect(camera.x, camera.y, camera.width,
    camera.height, graphics);
  this.player.draw(graphics);
  graphics.popState();
  graphics.popState();

  graphics.fillText('Player Mode', 5, 15, 'yellow');
};
