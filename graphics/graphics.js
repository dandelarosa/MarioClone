function Graphics(canvas) {
  this.canvas = canvas;
  this.context2d = canvas.getContext('2d');
}

Graphics.prototype.fillCanvas = function(color) {
  this.fillRect(0, 0, this.canvas.width, this.canvas.height, color);
};

Graphics.prototype.fillRect = function(x, y, width, height, color) {
  this.context2d.fillStyle = color;
  this.context2d.fillRect(x, y, width, height);
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
