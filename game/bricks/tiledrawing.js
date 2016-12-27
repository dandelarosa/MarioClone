function drawTile(graphics, value, x, y) {
  switch (value) {
    case TILE_EMPTY:
    case TILE_OUT_OF_BOUNDS:
      break;
    case TILE_BLUE_SKY:
      graphics.fillRect(x , y, 16, 16, 'blue');
      break;
    case TILE_BROWN_GROUND:
      drawTileImage(graphics, value, x, y);
      break;
    default:
      break;
  }
};

function drawTileImage(graphics, value, x, y) {
  if (isTileImageLoaded(value)) {
    graphics.drawImage(getTileImage(value), x, y);
  }
}
