const BRICK_GAP = 1;

function Bricks() {
  this.grid = new Grid();
}

Bricks.prototype.drawAll = function(graphics) {
  for (var index = 0; index < this.grid.length; index++) {
    if (this.grid.valueAtIndex(index) === 1) {
      var leftX = this.grid.xForIndex(index);
      var topY = this.grid.yForIndex(index);
      graphics.fillRect(leftX , topY, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP,
        'blue');
    }
  }
};

Bricks.prototype.maxX = function() {
  return this.grid.maxX();
};

Bricks.prototype.maxY = function() {
  return this.grid.maxY();
};

Bricks.prototype.minX = function() {
  return this.grid.minX();
};

Bricks.prototype.minY = function() {
  return this.grid.minY();
};
