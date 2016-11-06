var game;
var keyEvents;
var mouse;

window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var graphics = new Graphics(canvas);

  var root = document.documentElement;
  mouse = new Mouse(canvas, root);
  canvas.addEventListener('mousemove', updateMousePos);

  keyEvents = new KeyEvents();
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  var services = {
    graphics: graphics,
  };

  var firstLevel = new window[firstLevelClass];
  game = new window[gameClass](services, keyEvents, mouse, firstLevel);

  setInterval(gameUpdate, 1000 / game.FRAMES_PER_SECOND);
}

function updateMousePos(evt) {
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
