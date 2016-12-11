function create1dArray(original) {
  var row = [];
  for (var rowIndex = 0; rowIndex < original.length; rowIndex++) {
    row = row.concat(original[rowIndex]);
  }
  return row;
}

function create2dArray(original, itemsPerRow) {
  var rows = [];
  var numberOfItems = original.length;
  for (var index = 0; index < numberOfItems; index += itemsPerRow) {
    rows.push(original.slice(index, index + itemsPerRow));
  }
  return rows;
}

function addColumnsToGrid(grid, numberOfColumns, value) {
  for (var rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (var colIndex = 0; colIndex < numberOfColumns; colIndex++) {
      grid[rowIndex].push(value);
    }
  }
}

function removeLastColumnFromGrid(grid) {
  for (var rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    grid[rowIndex] = grid[rowIndex].slice(0, grid[rowIndex].length - 1);
  }
}
