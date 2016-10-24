var game;
var keyEvents;

window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var graphics = new Graphics(canvas);

  keyEvents = new KeyEvents();
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);

  var firstLevel = new window[firstLevelClass];
  game = new window[gameClass](keyEvents, graphics, firstLevel);

  setInterval(perFrame, 1000 / game.FRAMES_PER_SECOND);
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
