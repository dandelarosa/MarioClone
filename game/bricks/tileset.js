function Tileset() {
  var object = {
    drawTile: drawTile,
  };
  return object;

  function drawTile(graphics, value, x, y) {
    globals.drawTile(graphics, value, x, y);
  }
}
