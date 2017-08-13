function Level(builder) {
  var numCols = builder.numCols;

  var backgroundTilesData = builder.backgroundTilesData;
  this.backgroundTiles = new Grid2D(backgroundTilesData, numCols);

  var foregroundTilesData = builder.foregroundTilesData;
  this.foregroundTiles = new Grid2D(foregroundTilesData, numCols);

  this.tileset = new Tileset(builder.tilesetName);

  var enemies = builder.enemies;
  if (!enemies || enemies.length === 0) {
    var fixedEnemies = [];
    for (var i = 0; i < backgroundTilesData.length; i++) {
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
