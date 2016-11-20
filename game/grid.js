function Grid(builder) {
  this.cellHeight = builder.cellHeight;
  this.cellWidth = builder.cellWidth;
  this.data = builder.data.slice(); // Defensive copy
  this.length = this.data.length;
  this.numCols = builder.numCols;
  this.numRows = builder.numRows;
}

Grid.prototype.colForIndex = function(index) {
  return index % this.numCols;
}

Grid.prototype.maxX = function() {
  return this.numCols * this.cellWidth;
}

Grid.prototype.maxY = function() {
  return this.numRows * this.cellHeight;
}

Grid.prototype.minX = function() {
  return 0;
}

Grid.prototype.minY = function() {
  return 0;
}

Grid.prototype.rowForIndex = function(index) {
  return Math.floor(index / this.numCols);
};

Grid.prototype.valueAtIndex = function(index) {
  return this.data[index];
};

Grid.prototype.xForIndex = function(index) {
  return this.colForIndex(index) * this.cellWidth;
};

Grid.prototype.yForIndex = function(index) {
  return this.rowForIndex(index) * this.cellHeight;
};
