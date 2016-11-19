var game;

window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var graphics = new Graphics(canvas);

  document.addEventListener("keydown", gameKeydown);
  document.addEventListener("keyup", gameKeyup);

  var keyboard = new Keyboard();

  var services = {
    graphics: graphics,
    keyboard: keyboard,
  };

  var firstLevel = new window[firstLevelClass];
  game = new window[gameClass](services, firstLevel);

  setInterval(gameUpdate, 1000 / game.FRAMES_PER_SECOND);
}

function gameKeydown(evt) {
  var keyboard = game.services.keyboard;
  keyboard.keydown(evt);
};

function gameKeyup(evt) {
  var keyboard = game.services.keyboard;
  keyboard.keyup(evt);
};

function gameUpdate() {
  game.update();
}
