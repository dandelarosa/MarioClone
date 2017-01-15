var levelImageLoaded = {};
var levelImages = {};

function levelImageOnload(evt) {
  var imageId = evt.target.id;
  levelImageLoaded[imageId] = true;
}

function getLevelImage(key) {
  if (!worlds[key].levelImage) {
    return;
  }
  if (levelImages[key]) {
    return levelImages[key];
  }

  var newImage = document.createElement('img');
  newImage.setAttribute('id', key);
  newImage.onload = levelImageOnload;
  newImage.src = worlds[key].levelImage;
  levelImages[key] = newImage;

  return newImage;
};
