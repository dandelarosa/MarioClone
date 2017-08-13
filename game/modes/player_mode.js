function PlayerMode() {
  // Should find a better way to assign these
  this.scaleX = 2;
  this.scaleY = 2;
  this.width = 256;
  this.height = 240;

  this.isDebuggingCamera = persistence.getValue('isDebuggingCamera', 'bool', false);

  this.enemySpawner = new EnemySpawner();
  this.collisionDetector = new CollisionDetector();
}

PlayerMode.prototype = (function() {
  return {
    draw: draw,
    drawCameraDebugger: drawCameraDebugger,
    loadLevel: loadLevel,
    reset: reset,
    update: update,
  };

  function loadLevel(level) {
    this.level = level;
    this.reset();
  }

  /**
   * Restarts the level.
   */
  function reset() {
    var level = this.level;
    // TODO: have different tile systems for foreground tiles and background tiles
    var backgroundTiles = level.tileGrid.copy();
    var foregroundTiles = level.tileGrid.copy();
    // TODO: deprecate TileGrid class
    this.tiles = new TileGrid(level.tileGrid.copy(), level.tileset);
    var enemyGrid = level.enemyGrid.copy();
    this.enemyGrid = enemyGrid;

    this.player = new Player(this.width/2, this.height/2);
    this.enemies = [];
    this.camera = new PlayerCamera(0, 0, this.width, this.height);

    this.allGrids = new AllGrids({
      backgroundTiles: backgroundTiles,
      foregroundTiles: foregroundTiles,
      enemyGrid: enemyGrid,
      tileset: level.tileset,
    });

    this.collisionDetectors = {
      level: new LevelCollisionDetector(foregroundTiles),
      foreground: new ForegroundCollisionDetector(foregroundTiles),
    };
  }

  function update() {
    var keyboard = globals.keyboard;
    if (keyboard.isKeyPressedThisFrame(KEY_1)) {
      this.isDebuggingCamera = !this.isDebuggingCamera;
      persistence.setValue('isDebuggingCamera', this.isDebuggingCamera);
    }

    var player = this.player;
    var camera = this.camera;
    player.move(keyboard, camera, this.collisionDetectors);
    camera.follow(player, this.collisionDetectors);

    var cameraRect = camera.getRect();
    var newEnemies = this.enemySpawner.spawnInRect(this.enemyGrid, cameraRect);
    if (newEnemies.length > 0) {
      this.enemies = this.enemies.concat(newEnemies);
    }

    var collisionDetectors = this.collisionDetectors
    this.enemies.forEach(function(enemy) {
      enemy.update(collisionDetectors);
    });

    if (player.shouldCheckForEnemyCollisions()) {
      var playerDidDie = false;
      var playerDidKillEnemy = false;
      for (var i = 0; i < this.enemies.length; i++) {
        var enemy = this.enemies[i];
        if (!enemy.shouldCheckForPlayerCollisions()) {
          continue;
        }
        if (this.collisionDetector.objectsCollide(player, enemy)) {
          var playerRect = player.getRect();
          var enemyRect = enemy.getRect();
          if (playerRect.y + playerRect.height / 2 > enemyRect.y) {
            if (!playerDidDie) {
              player.switchToDeathState();
              playerDidDie = true;
            }
          }
          else {
            enemy.switchToDeathState();
            if (!playerDidKillEnemy) {
              var speed = player.getSpeed();
              speed.y = -5;
              playerDidKillEnemy = true;
            }
          }
        }
      }
    }

    var enemies = this.enemies;
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      var shouldDelete = false;
      if (enemy.deathTimer <= 0) {
        shouldDelete = true;
      }
      if (enemy.getRect().y > this.height) {
        shouldDelete = true;
      }
      if (shouldDelete) {
        enemies.splice(i, 1);
        i--;
      }
    }

    if (player.getY() > this.height) {
      this.reset();
    }
  }

  function draw() {
    var graphics = globals.graphics;
    graphics.pushState();
    graphics.scale(this.scaleX, this.scaleY);
    graphics.fillCanvas('black');

    graphics.pushState();
    var camera = this.camera;
    var cameraRect = camera.getRect();
    graphics.translate(-cameraRect.x, -cameraRect.y);
    this.allGrids.drawWithGraphicsInRect(graphics, cameraRect);
    this.enemies.forEach(function(enemy) {
      enemy.draw(graphics);
    });
    this.player.draw(graphics);
    if (this.isDebuggingCamera) {
      this.drawCameraDebugger(graphics);
    }
    graphics.popState();
    graphics.popState();

    graphics.fillText('Player Mode', 5, 15, 'yellow');
  }

  function drawCameraDebugger(graphics) {
    var camera = this.camera;
    var cameraRect = camera.getRect();
    var leftThreshold = cameraRect.x + camera.leftSnapThreshold;
    graphics.drawLine(leftThreshold, 0, leftThreshold, this.height, 'black');
    var rightThreshold = cameraRect.x + camera.rightSnapThreshold;
    graphics.drawLine(rightThreshold, 0, rightThreshold, this.height, 'black');
  }
})();
