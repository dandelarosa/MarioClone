function Mouse(canvas, documentRoot) {
  this.canvas = canvas;
  this.documentRoot = documentRoot;
  this.x = 0;
  this.y = 0;
};

Mouse.prototype.update = function(evt) {
  var canvas = this.canvas;
  var rect = canvas.getBoundingClientRect();
  var root = this.documentRoot;

  this.x = evt.clientX - rect.left - root.scrollLeft;
  this.y = evt.clientY - rect.top - root.scrollTop;
};
