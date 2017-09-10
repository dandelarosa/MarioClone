/**
 * Creates the size editor UI.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createSizeEditorUI(element) {
  var numColsHeader = document.createTextNode('Number of Columns: ');
  element.appendChild(numColsHeader);

  var numColsTextField = document.createElement('input');
  numColsTextField.id = 'numCols';
  numColsTextField.type = 'text';
  numColsTextField.value = game.editorMode.allGrids.backgroundTiles.numCols.toString();
  numColsTextField.readOnly = true;
  numColsTextField.style.width = '25px';
  element.appendChild(numColsTextField);

  element.appendChild(document.createElement('br'));

  var addColumnsButton = document.createElement('input');
  addColumnsButton.type = 'button';
  addColumnsButton.value = 'Add 16 columns';
  addColumnsButton.onclick = function() {
    addColumns(16);
  };
  element.appendChild(addColumnsButton);

  element.appendChild(document.createElement('br'));

  var deleteColumnsButton = document.createElement('input');
  deleteColumnsButton.type = 'button';
  deleteColumnsButton.value = 'Remove last column';
  deleteColumnsButton.onclick = function() {
    deleteLastColumn();
  };
  element.appendChild(deleteColumnsButton);
}

/**
 * Shows the number of columns in the grid on the editor.
 */
function displayNumCols() {
  var numColsTextField = document.getElementById('numCols');
  if (!numColsTextField) {
    return;
  }
  numColsTextField.value = game.editorMode.allGrids.backgroundTiles.numCols.toString();
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
  updateEnemiesDetailUI();
}

/**
 * Deletes the last column.
 */
function deleteLastColumn() {
  game.editorMode.deleteLastColumn();
  displayNumCols();
  updateBackgroundTilesDetailUI();
  updateForegroundTilesDetailUI();
  updateEnemiesDetailUI();
}
