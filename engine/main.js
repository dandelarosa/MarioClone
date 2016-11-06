var game;
var keyEvents;

window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var graphics = new Graphics(canvas);

  var root = document.documentElement;
  var mouse = new Mouse(canvas, root);
  canvas.addEventListener('mousemove', gameMousemove);

  keyEvents = new KeyEvents();
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  var services = {
    graphics: graphics,
    mouse: mouse,
  };

  var firstLevel = new window[firstLevelClass];
  game = new window[gameClass](services, keyEvents, mouse, firstLevel);

  setInterval(gameUpdate, 1000 / game.FRAMES_PER_SECOND);
}

function gameMousemove(evt) {
  var mouse = game.services.mouse;
  mouse.update(evt);
}

function keyPressed(evt) {
  keyEvents.setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
};

function keyReleased(evt) {
  keyEvents.setKeyHoldState(evt.keyCode, false);
};

function gameUpdate() {
  game.update();
}
