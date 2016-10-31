var game;
var keyEvents;

var mouseX = 0;
var mouseY = 0;

window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var graphics = new Graphics(canvas);

  canvas.addEventListener('mousemove', updateMousePos);

  keyEvents = new KeyEvents();
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  var firstLevel = new window[firstLevelClass];
  game = new window[gameClass](keyEvents, graphics, firstLevel);

  setInterval(perFrame, 1000 / game.FRAMES_PER_SECOND);
}

function updateMousePos(evt) {
  var canvas = document.getElementById('gameCanvas');
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keyPressed(evt) {
  keyEvents.setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
};

function keyReleased(evt) {
  keyEvents.setKeyHoldState(evt.keyCode, false);
};

function perFrame() {
  game.perFrame();
}
