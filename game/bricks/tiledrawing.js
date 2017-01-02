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
      graphics.fillRect(x , y, 16, 16, 'red');
      break;
    case TILE_CLOUD_UC:
      graphics.fillRect(x , y, 16, 16, 'orange');
      break;
    case TILE_CLOUD_UR:
      graphics.fillRect(x , y, 16, 16, 'yellow');
      break;
    case TILE_CLOUD_LL:
      graphics.fillRect(x , y, 16, 16, 'green');
      break;
    case TILE_CLOUD_LC:
      graphics.fillRect(x , y, 16, 16, 'cyan');
      break;
    case TILE_CLOUD_LR:
      graphics.fillRect(x , y, 16, 16, 'violet');
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
