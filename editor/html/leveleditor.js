/**
 * Creates the level editor UI. This should be called after creating the game object, in order to hook up the UI with the initial state.
 */
function createLevelEditorUI() {
  var editorElement = document.getElementById('editor');

  var table = document.createElement('table');
  editorElement.appendChild(table);

  var topRow = document.createElement('tr');
  table.appendChild(topRow);

  var topLeft = document.createElement('td');
  createLevelPickerUI(topLeft);
  topRow.appendChild(topLeft);

  var topRight = document.createElement('td');
  createGridPickerUI(topRight);
  topRow.appendChild(topRight);

  var bottomRow = document.createElement('tr');
  table.appendChild(bottomRow);

  var bottomLeft = document.createElement('td');
  createSizeEditorUI(bottomLeft);
  bottomRow.appendChild(bottomLeft);

  var bottomRight = document.createElement('td');
  createGridDetailUI(bottomRight);
  bottomRow.appendChild(bottomRight);
}
