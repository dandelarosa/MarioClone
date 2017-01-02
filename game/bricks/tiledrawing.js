function drawTile(graphics, value, x, y) {
  switch (value) {
    case TILE_EMPTY:
    case TILE_OUT_OF_BOUNDS:
    case undefined:
      break;
    case TILE_BLUE_SKY:
      graphics.fillRect(x , y, 16, 16, '#aaccff');
      break;
    default:
      drawTileImage(graphics, value, x, y);
      break;
  }
};

function drawTileImage(graphics, value, x, y) {
  if (isTileImageLoaded(value)) {
    graphics.drawImage(getTileImage(value), x, y);
  }
}
