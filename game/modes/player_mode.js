function PlayerMode() {
  // Should find a better way to assign these
  this.scaleX = 2;
  this.scaleY = 2;
  this.width = 256;
  this.height = 240;

  this.isDebuggingCamera = persistence.getValue('isDebuggingCamera', 'bool', false);
}

PlayerMode.prototype = (function() {
  return {
    draw: draw,
    drawCameraDebugger: drawCameraDebugger,
    loadWorld: loadWorld,
    update: update,
  };

  function loadWorld(world) {
    this.gridData = world.gridData;
    this.numCols = world.numCols;
    this.tilesetName = world.tilesetName;
    this.obstacles = world.obstacles;
    var grid = new Grid2D(this.gridData, this.numCols);
    var tileset = new Tileset(this.tilesetName);
    this.tiles = new TileGrid(grid, tileset);
    this.player = new Player(this.width/2, this.height/2);
    this.camera = new PlayerCamera(0, 0, this.width, this.height);
    this.obstacleGrid = new ObstacleGrid(this.obstacles, this.numCols);
  }

  function update() {
    var keyboard = globals.keyboard;
    if (keyboard.isKeyPressedThisFrame(KEY_1)) {
      this.isDebuggingCamera = !this.isDebuggingCamera;
      persistence.setValue('isDebuggingCamera', this.isDebuggingCamera);
    }

    this.player.move(keyboard, this.tiles);

    var camera = this.camera;
    camera.follow(this.player, this.tiles);
  }

  function draw() {
    var graphics = globals.graphics;
    graphics.pushState();
    graphics.scale(this.scaleX, this.scaleY);
    graphics.fillCanvas('black');

    graphics.pushState();
    var camera = this.camera;
    graphics.translate(-camera.x, -this.camera.y);
    this.tiles.drawInRect(camera.x, camera.y, camera.width,
      camera.height, graphics);
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
