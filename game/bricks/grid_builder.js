function GridBuilder(numCols, gridData) {
  var result = {
    cellWidth: 16,
    cellHeight: 16,
    data: gridData,
    numCols: numCols,
    numRows: 15,
  };
  return result;
};
