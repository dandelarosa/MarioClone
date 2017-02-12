function Graphics(canvas) {
  this.canvas = canvas;
  this.context2d = canvas.getContext('2d');
  this.context2d.imageSmoothingEnabled = false;
  
  this.drawClippedImage = drawClippedImage;
  this.drawLine = drawLine;

  // Basic Drawing

  function drawLine(point1x, point1y, point2x, point2y, color) {
    this.context2d.strokeStyle = color;
    this.context2d.beginPath();
    this.context2d.moveTo(point1x, point1y);
    this.context2d.lineTo(point2x, point2y);
    this.context2d.stroke();
  }

  // Drawing Images

  function drawClippedImage(img, sx, sy, sw, sh, ix, iy, iw, ih) {
    this.context2d.drawImage(img, sx, sy, sw, sh, ix, iy, iw, ih);
  }
}

Graphics.prototype.drawImage = function(image, x, y) {
  this.context2d.drawImage(image, x, y);
};

Graphics.prototype.drawImageWithAlpha = function(image, x, y, alpha) {
  this.context2d.save();
  this.context2d.globalAlpha = alpha;
  this.context2d.drawImage(image, x, y);
  this.context2d.restore();
};

Graphics.prototype.fillCanvas = function(color) {
  this.fillRect(0, 0, this.canvas.width, this.canvas.height, color);
};

Graphics.prototype.fillCircle = function (centerX, centerY, radius, fillColor) {
  this.context2d.fillStyle = fillColor;
  this.context2d.beginPath();
  this.context2d.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  this.context2d.fill();
};

Graphics.prototype.fillRect = function(x, y, width, height, color) {
  this.context2d.fillStyle = color;
  this.context2d.fillRect(x, y, width, height);
};

Graphics.prototype.fillText = function(text, x, y, textColor) {
  this.context2d.fillStyle = textColor;
  this.context2d.fillText(text, x, y);
};

Graphics.prototype.popState = function() {
  this.context2d.restore();
};

Graphics.prototype.pushState = function() {
  this.context2d.save();
};

Graphics.prototype.translate = function(x, y) {
  this.context2d.translate(x, y);
};

Graphics.prototype.scale = function(x, y) {
  this.context2d.scale(x, y);
};
