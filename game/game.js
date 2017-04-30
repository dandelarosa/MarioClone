function Game() {
  this.fps = 30;
  this.width = 256;
  this.height = 240;
  this.scaleX = 2;
  this.scaleY = 2;
  this.playerMode = new PlayerMode();
  this.editorMode = new EditorMode();

  if (persistence.getValue('isEditing', 'bool', false)) {
    this.currentMode = this.editorMode;
  }
  else {
    this.currentMode = this.playerMode;
  }
};

Game.prototype = (function() {
  return {
    loadWorld: loadWorld,
    update: update,
    updateLevel: updateLevel,
  };

  function loadWorld(world) {
    this.playerMode.loadWorld(world);
    this.editorMode.loadWorld(world);
  }

  function updateLevel() {
    var grid = new Grid2D(this.gridData, this.numCols);
    var tileset = new Tileset(this.tilesetName);
    this.playerMode.tiles = new TileGrid(grid, tileset);
    this.editorMode.tiles = new TileGrid(grid, tileset);
  }

  function update() {
    var keyboard = globals.keyboard;
    var mouse = globals.mouse;
    if (keyboard.isKeyPressedThisFrame(KEY_ESC)) {
      if (this.currentMode == this.playerMode) {
        this.currentMode = this.editorMode;
        persistence.setValue('isEditing', true);
      }
      else {
        this.currentMode = this.playerMode;
        persistence.setValue('isEditing', true);
      }
    }

    this.currentMode.update();
    this.currentMode.draw();

    keyboard.resetKeyStateChanges();
    mouse.resetStateChange();
  }
})();
