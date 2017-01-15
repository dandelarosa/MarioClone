function Tileset() {
  var tileset = {
    drawTile: drawTile,
    image: getTilesetImage('plain'),
    name: 'plain',
  };
  return tileset;

  function drawTile(graphics, value, x, y) {
    if (value === undefined) return;
    if (value < TILE_V2_EMPTY) {
      globals.drawTile(graphics, value, x, y);
      return;
    }
    if (tilesetImageLoaded[tileset.name]) {
      var image = tileset.image;
      var sampleX = TILE_DETAILS[value].sampleX;
      var sampleY = TILE_DETAILS[value].sampleY;
      graphics.drawClippedImage(image, sampleX, sampleY, 16, 16, x, y, 16, 16);
    }
  }
}
