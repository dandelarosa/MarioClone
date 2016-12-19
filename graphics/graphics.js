function Graphics(canvas) {
  this.canvas = canvas;
  this.context2d = canvas.getContext('2d');
}

Graphics.prototype.drawImage = function(image, x, y) {
  this.context2d.drawImage(image, x, y);
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
