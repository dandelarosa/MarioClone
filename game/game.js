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
    loadLevel: loadLevel,
    runLoop: runLoop,
  };

  function loadLevel(level) {
    this.playerMode.loadLevel(level);
    this.editorMode.loadLevel(level);
  }

  function runLoop() {
    // Update
    var keyboard = globals.keyboard;
    var mouse = globals.mouse;
    if (keyboard.isKeyPressedThisFrame(KEY_ESC)) {
      if (this.currentMode == this.playerMode) {
        this.currentMode = this.editorMode;
        persistence.setValue('isEditing', true);
      }
      else {
        this.currentMode = this.playerMode;
        persistence.setValue('isEditing', false);
      }
    }

    this.currentMode.update();

    keyboard.resetKeyStateChanges();
    mouse.resetStateChange();

    // Draw
    this.currentMode.draw();
    var graphics = globals.graphics;
    graphics.fillText(fpsString, 470, 15, 'yellow');
  }

})();
