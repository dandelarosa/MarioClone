function drawTile(graphics, value, x, y) {
  switch (value) {
    case TILE_EMPTY:
    case TILE_OUT_OF_BOUNDS:
      break;
    case TILE_BLUE_SKY:
      graphics.fillRect(x , y, 16, 16, 'blue');
      break;
    case TILE_BROWN_GROUND:
      graphics.fillRect(x , y, 16, 16, 'brown');
      break;
    default:
      break;
  }
};
