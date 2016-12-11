// Images aren't part of the repository for obvious reasons
const DEFAULT_LEVEL_IMAGE_LOCATION = '../../../../Downloads/mario_levels/';

var levelImageLoaded = {};

function levelImageOnload(evt) {
  var imageId = evt.target.id;
  levelImageLoaded[imageId] = true;
}

var world11image = document.createElement('img');
world11image.setAttribute('id', 'world_1-1');
world11image.onload = levelImageOnload;
world11image.src = DEFAULT_LEVEL_IMAGE_LOCATION + 'smb_1-1.png';
