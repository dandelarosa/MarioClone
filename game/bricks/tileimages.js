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
    case TILE_CLOUD_UL:
      return 'cloud_ul.png';
    case TILE_CLOUD_UC:
      return 'cloud_uc.png';
    case TILE_CLOUD_UR:
      return 'cloud_ur.png';
    case TILE_CLOUD_LL:
      return 'cloud_ll.png';
    case TILE_CLOUD_LC:
      return 'cloud_lc.png';
    case TILE_CLOUD_LR:
      return 'cloud_lr.png';
    case TILE_BUSH_LEFT:
      return 'bush-left.png';
    case TILE_BUSH_CENTER:
      return 'bush-center.png';
    case TILE_BUSH_RIGHT:
      return 'bush-right.png';
    case TILE_HILL_LEFT: return 'hill-left.png';
    case TILE_HILL_TOP: return 'hill-top.png';
    case TILE_HILL_RIGHT: return 'hill-right.png';
    case TILE_HILL_EYES: return 'hill-eyes.png';
    case TILE_HILL_NOEYES: return 'hill-noeyes.png';
    case TILE_CASTLE_TOP: return 'castle-top.png';
    case TILE_CASTLE_WINDOWLEFT: return 'castle-windowleft.png';
    case TILE_CASTLE_WINDOWRIGHT: return 'castle-windowright.png';
    case TILE_CASTLE_BRICKS: return 'castle-bricks.png';
    case TILE_CASTLE_DOORTOP: return 'castle-doortop.png';
    case TILE_CASTLE_DOORMIDDLE: return 'castle-doormiddle.png';
    case TILE_CASTLE_TOPMIDDLE: return 'castle-topmiddle.png';
    case TILE_PIPE_TOP_LEFT: return 'pipe-topleft.png';
    case TILE_PIPE_TOP_RIGHT: return 'pipe-topright.png';
    case TILE_PIPE_MID_LEFT: return 'pipe-midleft.png';
    case TILE_PIPE_MID_RIGHT: return 'pipe-midright.png';
    case TILE_FLAGPOLE_TOP: return 'flagpole-top.png';
    case TILE_FLAGPOLE_MID: return 'flagpole-middle.png';
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
    case TILE_CASTLE_BG: return 'castle/bg.png';
    case TILE_CASTLE_SOLID_BLOCK: return 'castle/block.png';
    case TILE_CASTLE_LAVA_TOP: return 'castle/lava-top.png';
    case TILE_CASTLE_LAVA_MIDDLE: return 'castle/lava-middle.png';
    case TILE_CASTLE_EMPTY_BLOCK: return 'castle/emptyblock.png';
    case TILE_CASTLE_ITEM_BLOCK: return 'castle/itemblock.png';
    case TILE_CASTLE_BRIDGE: return 'castle/bridge.png';
    case TILE_CASTLE_CHAIN: return 'castle/chain.png';
    case TILE_CASTLE_AXE: return 'castle/axe.png';
  }
}

function tileImageOnload(evt) {
  var imageId = evt.target.id;
  tileImageLoaded[imageId] = true;
}
