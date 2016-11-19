var globals = new Globals();

function Globals() {
  var globals = {
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
  }

  function gameKeydown(evt) {
    globals.keyboard.keydown(evt);
  };

  function gameKeyup(evt) {
    globals.keyboard.keyup(evt);
  };

  function gameMousemove(evt) {
    globals.mouse.update(evt);
  }
}
