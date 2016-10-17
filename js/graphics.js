function Graphics(canvas) {
  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;

  var canvasContext = canvas.getContext('2d');
  this.context2d = canvasContext;
};

Graphics.prototype.fillWholeScreen = function(color) {
  this.colorRect(0, 0, this.canvasWidth, this.canvasHeight, color);
};

Graphics.prototype.drawBitmapCenteredWithRotation = function (bitmap, atX, atY, rot) {
  this.context2d.save();
  this.context2d.translate(atX, atY);
  this.context2d.rotate(rot);
  this.context2d.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
  this.context2d.restore();
};

Graphics.prototype.colorRect = function (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  this.context2d.fillStyle = fillColor;
  this.context2d.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

Graphics.prototype.colorCircle = function(centerX, centerY, radius, fillColor) {
  this.context2d.fillStyle = fillColor;
  this.context2d.beginPath();
  this.context2d.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  this.context2d.fill();
};

Graphics.prototype.colorText = function(showWords, textX, textY, fillColor) {
  this.context2d.fillStyle = fillColor;
  this.context2d.fillText(showWords, textX, textY);
};
