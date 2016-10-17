var game;

window.onload = function() {
  var canvas = document.getElementById('gameCanvas');
  var graphics = new Graphics(canvas);

  var firstLevel = new window[firstLevelClass];
  game = new window[gameClass](graphics, firstLevel);

  setupInput();
  setInterval(perFrame, 1000 / game.FRAMES_PER_SECOND);
}

function perFrame() {
  game.perFrame();
}
