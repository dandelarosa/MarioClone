function EditorMode(game, tiles) {
  this.scaleX = 2;
  this.scaleY = 2;
  this.tiles = tiles;
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

  // To initialize later
  this.editorCamera = null;
  this.levelImageKey = null;
  this.levelImageOffset = null;
}

EditorMode.prototype = (function() {
  return {
    draw: draw,
    loadWorld: loadWorld,
    reset: reset,
    update: update,
  }

  function loadWorld() {
  }

  function reset() {
  }

  function update() {
  }

  function draw() {
  }
})();
