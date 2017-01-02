function drawTile(graphics, value, x, y) {
  switch (value) {
    case TILE_EMPTY:
    case TILE_OUT_OF_BOUNDS:
      break;
    case TILE_BLUE_SKY:
      graphics.fillRect(x , y, 16, 16, '#aaccff');
      break;
    case TILE_BROWN_GROUND:
      drawTileImage(graphics, value, x, y);
      break;
    case TILE_CLOUD_UL:
      drawTileImage(graphics, value, x, y);
      break;
    case TILE_CLOUD_UC:
      drawTileImage(graphics, value, x, y);
      break;
    case TILE_CLOUD_UR:
      drawTileImage(graphics, value, x, y);
      break;
    case TILE_CLOUD_LL:
      drawTileImage(graphics, value, x, y);
      break;
    case TILE_CLOUD_LC:
      drawTileImage(graphics, value, x, y);
      break;
    case TILE_CLOUD_LR:
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
