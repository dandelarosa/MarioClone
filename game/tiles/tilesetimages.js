var tilesetImageLoaded = {};
var tilesetImages = {};

function tilesetImageOnload(evt) {
  var imageId = evt.target.id;
  tilesetImageLoaded[imageId] = true;
}

function getTilesetImage(key) {
  if (tilesetImages[key]) {
    return tilesetImages[key];
  }

  var newImage = document.createElement('img');
  newImage.setAttribute('id', key);
  newImage.onload = tilesetImageOnload;
  newImage.src = 'images/tileset-' + key + '.png';
  levelImages[key] = newImage;

  return newImage;
};
