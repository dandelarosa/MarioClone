var globals = new Globals();

function Globals() {
  var globals = {
    setup: setup,
  };
  return globals;

  function setup() {
    var canvas = document.getElementById('gameCanvas');
    globals.graphics = new Graphics(canvas);
  }
}
