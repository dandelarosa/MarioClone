function Mouse(canvas, documentRoot) {
  this.canvas = canvas;
  this.documentRoot = documentRoot;
  this.isDown = false;
  this.stateChanged = false;
  this.x = 0;
  this.y = 0;
}

Mouse.prototype.isPressedThisFrame = function() {
  return this.stateChanged && this.isDown;
};

Mouse.prototype.mousedown = function(evt) {
  this.isDown = true;
  this.stateChanged = true;
};

Mouse.prototype.mouseup = function(evt) {
  this.isDown = false;
  this.stateChanged = true;
};

// Should call at the end of the update function
Mouse.prototype.resetStateChange = function() {
  this.stateChanged = false;
};

Mouse.prototype.update = function(evt) {
  var canvas = this.canvas;
  var rect = canvas.getBoundingClientRect();
  var root = this.documentRoot;

  this.x = evt.clientX - rect.left - root.scrollLeft;
  this.y = evt.clientY - rect.top - root.scrollTop;
};
