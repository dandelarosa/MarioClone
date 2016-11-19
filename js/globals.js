var globals = new Globals();

function Globals() {
  var globals = {
    mouse: null,
    setup: setup,
  };
  return globals;

  function setup() {
    var canvas = document.getElementById('gameCanvas');
    globals.graphics = new Graphics(canvas);

    globals.mouse = new Mouse(canvas, document.documentElement);
    canvas.addEventListener('mousemove', gameMousemove);
  }

  function gameMousemove(evt) {
    globals.mouse.update(evt);
  }
}
