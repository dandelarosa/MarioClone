function Graphics(canvas) {
  this.canvas = canvas;
  this.context2d = canvas.getContext('2d');
  this.context2d.imageSmoothingEnabled = false;
}

Graphics.prototype = (function() {
  return {
    drawClippedImage: drawClippedImage,
    drawImage: drawImage,
    drawImageWithAlpha: drawImageWithAlpha,
    drawLine: drawLine,
    fillCanvas: fillCanvas,
    fillCircle: fillCircle,
    fillRect: fillRect,
    fillText: fillText,
    popState: popState,
    pushState: pushState,
    translate: translate,
    scale: scale,
  };

  // Shortcuts

  function fillCanvas(color) {
    this.fillRect(0, 0, this.canvas.width, this.canvas.height, color);
  }

  // Basic Drawing

  function fillRect(x, y, width, height, color) {
    this.context2d.fillStyle = color;
    this.context2d.fillRect(x, y, width, height);
  }

  function drawLine(point1x, point1y, point2x, point2y, color) {
    this.context2d.strokeStyle = color;
    this.context2d.beginPath();
    this.context2d.moveTo(point1x, point1y);
    this.context2d.lineTo(point2x, point2y);
    this.context2d.stroke();
  }

  function fillCircle(centerX, centerY, radius, fillColor) {
    this.context2d.fillStyle = fillColor;
    this.context2d.beginPath();
    this.context2d.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    this.context2d.fill();
  }

  // Drawing Text

  function fillText(text, x, y, textColor) {
    this.context2d.fillStyle = textColor;
    this.context2d.fillText(text, x, y);
  }

  // Drawing Images

  function drawImage(image, x, y) {
    this.context2d.drawImage(image, x, y);
  }

  function drawImageWithAlpha(image, x, y, alpha) {
    this.context2d.save();
    this.context2d.globalAlpha = alpha;
    this.context2d.drawImage(image, x, y);
    this.context2d.restore();
  }

  function drawClippedImage(img, sx, sy, sw, sh, ix, iy, iw, ih) {
    this.context2d.drawImage(img, sx, sy, sw, sh, ix, iy, iw, ih);
  }

  // State Machine

  function popState() {
    this.context2d.restore();
  }

  function pushState() {
    this.context2d.save();
  }

  function translate(x, y) {
    this.context2d.translate(x, y);
  }

  function scale(x, y) {
    this.context2d.scale(x, y);
  }
})();
