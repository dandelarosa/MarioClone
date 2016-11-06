var game;

window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var graphics = new Graphics(canvas);

  var root = document.documentElement;
  var mouse = new Mouse(canvas, root);
  canvas.addEventListener('mousemove', gameMousemove);

  document.addEventListener("keydown", gameKeydown);
  document.addEventListener("keyup", gameKeyup);

  var keyboard = new Keyboard();

  var services = {
    graphics: graphics,
    keyboard: keyboard,
    mouse: mouse,
  };

  var firstLevel = new window[firstLevelClass];
  game = new window[gameClass](services, firstLevel);

  setInterval(gameUpdate, 1000 / game.FRAMES_PER_SECOND);
}

function gameMousemove(evt) {
  var mouse = game.services.mouse;
  mouse.update(evt);
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
