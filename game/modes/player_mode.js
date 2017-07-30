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
    var foregroundTiles = level.tileGrid.copy();
    // TODO: deprecate TileGrid class
    this.tiles = new TileGrid(level.tileGrid.copy(), level.tileset);
    this.enemyGrid = level.enemyGrid.copy();

    this.player = new Player(this.width/2, this.height/2);
    this.enemies = [];
    this.camera = new PlayerCamera(0, 0, this.width, this.height);

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
    player.move(keyboard, this.tiles, camera, this.collisionDetectors);
    camera.follow(player, this.tiles);

    var cameraRect = camera.getRect();
    var newEnemies = this.enemySpawner.spawnInRect(this.enemyGrid, cameraRect);
    if (newEnemies.length > 0) {
      this.enemies = this.enemies.concat(newEnemies);
    }

    var tiles = this.tiles;
    var collisionDetectors = this.collisionDetectors
    this.enemies.forEach(function(enemy) {
      enemy.update(tiles, collisionDetectors);
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
    graphics.translate(-camera.x, -this.camera.y);
    this.tiles.drawInRect(cameraRect, graphics);
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
    var leftThreshold = camera.x + camera.leftSnapThreshold;
    graphics.drawLine(leftThreshold, 0, leftThreshold, this.height, 'black');
    var rightThreshold = camera.x + camera.rightSnapThreshold;
    graphics.drawLine(rightThreshold, 0, rightThreshold, this.height, 'black');
  }
})();
