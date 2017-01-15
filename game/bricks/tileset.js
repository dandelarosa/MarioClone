function Tileset() {
  var object = {
    drawTile: drawTile,
  };
  return object;

  function drawTile(graphics, value, x, y) {
    if (value < TILE_V2_EMPTY) {
      globals.drawTile(graphics, value, x, y);
      return;
    }
  }
}
