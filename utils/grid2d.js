function Grid2D(data, numCols) {
  this.data = data;
  this.numCols = numCols;
}

Grid2D.prototype = (function() {
  return {
    getData: getData,
    getIndexForColAndRow: getIndexForColAndRow,
    getValueAtColAndRow: getValueAtColAndRow,
    getValueAtIndex: getValueAtIndex,
    isColRowInBounds: isColRowInBounds,
    indexForColAndRow: indexForColAndRow, // Deprecated
    setValueAtColAndRow: setValueAtColAndRow,
    setValueAtIndex: setValueAtIndex,
    valueAtColAndRow: valueAtColAndRow, // Deprecated
    valueAtIndex: valueAtIndex, // Deprecated
  }

  // Querying Data

  function getData() {
    var defensiveCopy = this.data.slice();
    return defensiveCopy;
  }

  function isColRowInBounds(col, row) {
    if (col < 0) {
      return false;
    }
    else if (col > this.numCols) {
      return false;
    }
    else if (row < 0) {
      return false;
    }
    else if (row > this.data.length / this.numCols) {
      return false;
    }
    else {
      return true;
    }
  }

  function getIndexForColAndRow(col, row) {
    return col + row * this.numCols;
  }

  function indexForColAndRow(col, row) {
    return this.getIndexForColAndRow(col, row);
  }

  function getValueAtIndex(index) {
    return this.data[index];
  }

  function valueAtIndex(index) {
    return this.getValueAtIndex(index);
  }

  function getValueAtColAndRow(col, row) {
    var index = this.getIndexForColAndRow(col, row);
    return this.getValueAtIndex(index);
  }

  function valueAtColAndRow(col, row) {
    return this.getValueAtColAndRow(col, row);
  }

  // Modifying Data

  function setValueAtIndex(value, index) {
    this.data[index] = value;
  }

  function setValueAtColAndRow(value, col, row) {
    var index = this.indexForColAndRow(col, row);
    this.setValueAtIndex(value, index);
  }
})();
