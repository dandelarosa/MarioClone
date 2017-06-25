function Level(builder) {
  var numCols = builder.numCols;

  // Should split into foreground tiles and background tiles
  var tiles = builder.gridData;
  var tileGrid = new Grid2D(tiles, numCols);
  this.tileGrid = tileGrid;

  this.tileset = new Tileset(builder.tilesetName);

  var enemies = builder.enemies;
  if (!enemies || enemies.length === 0) {
    var fixedEnemies = [];
    for (var i = 0; i < tiles.length; i++) {
      fixedEnemies.push(ENEMY_NONE);
    }
    enemies = fixedEnemies;
  }
  var enemyGrid = new Grid2D(enemies, numCols);
  this.enemyGrid = enemyGrid;

  // For editor. Can reorganize this?
  this.key = builder.key;
  this.levelImage = builder.levelImage;
  this.levelImageOffset = builder.levelImageOffset;
}

Level.prototype = (function() {
})();
