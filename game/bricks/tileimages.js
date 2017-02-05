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
    case TILE_HILL_LEFT: return 'hill-left.png';
    case TILE_HILL_TOP: return 'hill-top.png';
    case TILE_HILL_RIGHT: return 'hill-right.png';
    case TILE_HILL_EYES: return 'hill-eyes.png';
    case TILE_HILL_NOEYES: return 'hill-noeyes.png';
    case TILE_PIPE_TOP_LEFT: return 'pipe-topleft.png';
    case TILE_PIPE_TOP_RIGHT: return 'pipe-topright.png';
    case TILE_PIPE_MID_LEFT: return 'pipe-midleft.png';
    case TILE_PIPE_MID_RIGHT: return 'pipe-midright.png';
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
    case TILE_SOLID_BLOCK: return 'plain/block.png';
    case TILE_ITEM_BLOCK: return 'plain/itemblock.png';
    case TILE_TREE_TOP_LEFT: return 'plain/treetop-left.png';
    case TILE_TREE_TOP_CENTER: return 'plain/treetop-center.png';
    case TILE_TREE_TOP_RIGHT: return 'plain/treetop-right.png';
    case TILE_TREE_TRUNK: return 'plain/treetrunk.png';
  }
}

function tileImageOnload(evt) {
  var imageId = evt.target.id;
  tileImageLoaded[imageId] = true;
}
