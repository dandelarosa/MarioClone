function ObstacleGrid(data, numCols) {
  return {
    data: data,
    indexForColAndRow: indexForColAndRow,
    numCols: numCols,
    setValueAtColRow: setValueAtColRow,
  };

  // Querying Data

  function indexForColAndRow(col, row) {
    return col + row * this.numCols;
  }

  // Modifying Data

  function setValueAtColRow(value, col, row) {
    var index = this.indexForColAndRow(col, row);
    this.data[index] = value;
  }
}
