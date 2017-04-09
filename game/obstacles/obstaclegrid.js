function ObstacleGrid(data, numCols) {
  return {
    data: data,
    draw: draw,
    indexForColAndRow: indexForColAndRow,
    numCols: numCols,
    setValueAtColRow: setValueAtColRow,
    valueAtColAndRow: valueAtColAndRow,
    valueAtIndex: valueAtIndex,
  };

  // Querying Data

  function indexForColAndRow(col, row) {
    return col + row * this.numCols;
  }

  function valueAtIndex(index) {
    return this.data[index];
  }

  function valueAtColAndRow(col, row) {
    var index = this.indexForColAndRow(col, row);
    return this.valueAtIndex(index);
  }

  // Modifying Data

  function setValueAtColRow(value, col, row) {
    var index = this.indexForColAndRow(col, row);
    this.data[index] = value;
  }

  // Drawing

  function draw(x, y, width, height, graphics) {
    const obstacleWidth = 16;
    const obstacleHeight = 16;

    var leftMostCol = Math.floor(x / obstacleWidth);
    var topMostRow = Math.floor(y / obstacleHeight);

    var colsThatFitInRect = Math.floor(width / obstacleWidth);
    var rowsThatFitInRect = Math.floor(height / obstacleHeight);

    // Draw a one-cell buffer on each side
    var rightMostCol = leftMostCol + colsThatFitInRect + 2;
    var bottomMostRow = topMostRow + rowsThatFitInRect + 2;

    for (var row = topMostRow; row < bottomMostRow; row++) {
      for (var col = leftMostCol; col < rightMostCol; col++) {
        var obstacleIndex = this.indexForColAndRow(col, row);
        var obstacleValue = this.valueAtIndex(obstacleIndex);
        if (typeof obstacleValue === 'number' && obstacleValue > OBSTACLE_EMPTY) {
          var rectX = row * obstacleWidth;
          var rectY = col * obstacleHeight;
          var rectWidth = obstacleWidth;
          var rectHeight = obstacleHeight;
          graphics.fillRect(rectX, rectY, rectWidth, rectHeight, 'blue');
        }
      }
    }
  }
}
