function Grid2D(data, numCols) {
  return {
    data: data,
    getData: getData,
    indexForColAndRow: indexForColAndRow,
    numCols: numCols,
    setValueAtColAndRow: setValueAtColAndRow,
    setValueAtIndex: setValueAtIndex,
    valueAtColAndRow: valueAtColAndRow,
    valueAtIndex: valueAtIndex,
  }

  // Querying Data

  function getData() {
    var defensiveCopy = this.data.slice();
    return defensiveCopy;
  }

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

  function setValueAtIndex(value, index) {
    this.data[index] = value;
  }

  function setValueAtColAndRow(value, col, row) {
    var index = this.indexForColAndRow(col, row);
    this.setValueAtIndex(value, index);
  }
}
