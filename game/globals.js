var globals = new Globals();

function Globals() {
  var globals = {
    drawTile: drawTile, // defined in tiledrawing.js
    keyboard: null,
    mouse: null,
    setup: setup,
  };
  return globals;

  function setup() {
    var canvas = document.getElementById('gameCanvas');
    globals.graphics = new Graphics(canvas);

    globals.keyboard = new Keyboard();
    document.addEventListener("keydown", gameKeydown);
    document.addEventListener("keyup", gameKeyup);

    globals.mouse = new Mouse(canvas, document.documentElement);
    canvas.addEventListener('mousemove', gameMousemove);
    canvas.addEventListener('mousedown', gameMousedown);
    canvas.addEventListener('mouseup', gameMouseup);
  }

  function gameKeydown(evt) {
    globals.keyboard.keydown(evt);
  };

  function gameKeyup(evt) {
    globals.keyboard.keyup(evt);
  };

  function gameMousedown(evt) {
    globals.mouse.mousedown(evt);
  }

  function gameMousemove(evt) {
    globals.mouse.update(evt);
  }

  function gameMouseup(evt) {
    globals.mouse.mouseup(evt);
  }
}
