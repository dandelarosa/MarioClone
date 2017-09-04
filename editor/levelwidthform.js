/**
 * Creates the HTML form for editing the size of the grid data.
 */
function createLevelWidthForm() {
  var levelWidthDiv = document.getElementById('levelWidth');

  var numColsHeader = document.createTextNode('Number of Columns: ');
  levelWidthDiv.appendChild(numColsHeader);

  var numColsTextField = document.createElement('input');
  numColsTextField.id = 'levelWidth.numCols';
  numColsTextField.type = 'text';
  numColsTextField.value = '';
  numColsTextField.readOnly = true;
  numColsTextField.style.width = '25px';
  levelWidthDiv.appendChild(numColsTextField);

  levelWidthDiv.appendChild(document.createElement('br'));

  var addColumnsButton = document.createElement('input');
  addColumnsButton.type = 'button';
  addColumnsButton.value = 'Add 16 columns';
  addColumnsButton.onclick = function() {
    addColumns(16);
  };
  levelWidthDiv.appendChild(addColumnsButton);

  levelWidthDiv.appendChild(document.createElement('br'));

  var deleteColumnsButton = document.createElement('input');
  deleteColumnsButton.type = 'button';
  deleteColumnsButton.value = 'Remove last column';
  deleteColumnsButton.onclick = function() {
    deleteLastColumn();
  };
  levelWidthDiv.appendChild(deleteColumnsButton);
}

/**
 * Shows the number of columns in the grid on the editor.
 */
function displayNumCols() {
  var numColsElement = document.getElementById('levelWidth.numCols');
  numColsElement.value = game.editorMode.numCols.toString();
}

/**
 * Adds columns to the right side of the grid.
 * @param {number} colsToAdd - The number of columns to add.
 */
function addColumns(colsToAdd) {
  game.editorMode.addColumns(colsToAdd);
  displayNumCols();
  updateBackgroundTilesDetailUI();
  updateForegroundTilesDetailUI();
  displayObstacleData();
}

/**
 * Deletes the last column.
 */
function deleteLastColumn() {
  game.editorMode.deleteLastColumn();
  displayNumCols();
  updateBackgroundTilesDetailUI();
  updateForegroundTilesDetailUI();
  displayObstacleData();
}
