function Tileset() {
  var tileset = {
    drawTile: drawTile,
    image: getTilesetImage('plain'),
    name: 'plain',
  };
  return tileset;

  function drawTile(graphics, value, x, y) {
    if (value < TILE_V2_EMPTY) {
      globals.drawTile(graphics, value, x, y);
      return;
    }
    if (tilesetImageLoaded[tileset.name]) {
      var image = tileset.image;
      var sampleX;
      var sampleY;

      switch(value) {
        case TILE_V2_TEST_1:
        {
          sampleX = 16;
          sampleY = 0;
          break;
        }
        case TILE_V2_TEST_2:
        {
          sampleX = 32;
          sampleY = 0;
          break;
        }
        case TILE_V2_TEST_3:
        {
          sampleX = 48;
          sampleY = 0;
          break;
        }
        default:
        {
          sampleX = 0;
          sampleY = 0;
          break;
        }
      }

      graphics.drawClippedImage(image, sampleX, sampleY, 16, 16, x, y, 16, 16);
    }
  }
}
