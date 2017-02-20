var tileImageLoaded = {};
var tileImages = {};

function isTileImageLoaded(key) {
  if (!tileImages[key]) {
    createTileImage(key);
    return false;
  }
  return tileImageLoaded[key];
}

function getTileImage(key) {
  if (tileImages[key]) {
    return tileImages[key];
  }
  return createTileImage(key);
}

function createTileImage(key) {
  var newImage = document.createElement('img');
  newImage.setAttribute('id', key);
  newImage.onload = tileImageOnload;
  newImage.src = 'images/' + filenameForKey(key);
  tileImages[key] = newImage;
  return newImage;
}

function filenameForKey(key) {
  switch(key) {
    case TILE_UNDERGROUND_BG: return 'underground/bg.png';
    case TILE_BLUE_ROCKS: return 'underground/rocks.png';
    case TILE_BLUE_BLOCK: return 'underground/block.png';
    case TILE_BLUE_BRICK_BLOCK: return 'underground/bricks.png';
    case TILE_UNDERGROUND_PIPE_TOP_END_LEFT: return 'underground/pipe-topleft.png';
    case TILE_UNDERGROUND_PIPE_TOP_END_RIGHT: return 'underground/pipe-topright.png';
    case TILE_UNDERGROUND_PIPE_V_LEFT: return 'underground/pipe-vleft.png';
    case TILE_UNDERGROUND_PIPE_V_RIGHT: return 'underground/pipe-vright.png';
    case TILE_UNDERGROUND_PIPE_H_TOP: return 'underground/pipe-htop.png';
    case TILE_UNDERGROUND_PIPE_H_BOTTOM: return 'underground/pipe-hbottom.png';
    case TILE_UNDERGROUND_PIPE_LEFT_END_TOP: return 'underground/pipe-lefttop.png';
    case TILE_UNDERGROUND_PIPE_LEFT_END_BOTTOM: return 'underground/pipe-leftbottom.png';
    case TILE_UNDERGROUND_PIPE_LEFT_INT_TOP: return 'underground/pipe-leftinttop.png';
    case TILE_UNDERGROUND_PIPE_LEFT_INT_BOTTOM: return 'underground/pipe-leftintbottom.png';
  }
}

function tileImageOnload(evt) {
  var imageId = evt.target.id;
  tileImageLoaded[imageId] = true;
}
