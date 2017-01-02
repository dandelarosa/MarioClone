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
    case TILE_BROWN_GROUND:
      return 'block1.png';
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
  }
}

function tileImageOnload(evt) {
  var imageId = evt.target.id;
  tileImageLoaded[imageId] = true;
}
