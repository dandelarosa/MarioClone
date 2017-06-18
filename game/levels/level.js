function Level(builder) {
  var numCols = builder.numCols;

  // Should split into foreground tiles and background tiles
  var tiles = builder.gridData;
  var tileGrid = new Grid2D(tiles, numCols);
  this.tileGrid = tileGrid;

  this.tileset = new Tileset(builder.tilesetName);

  // Should split into enemies and obstacles
  var obstacles = builder.obstacles;
  if (!obstacles || obstacles.length === 0) {
    var newObstacles = [];
    for (var i = 0; i < tiles.length; i++) {
      newObstacles.push(OBSTACLE_EMPTY);
    }
    obstacles = newObstacles;
  }
  var obstacleGrid = new Grid2D(obstacles, numCols);
  this.obstacleGrid = obstacleGrid;

  // For editor. Can reorganize this?
  this.key = builder.key;
  this.levelImageOffset = builder.levelImageOffset;
}

Level.prototype = (function() {
})();
