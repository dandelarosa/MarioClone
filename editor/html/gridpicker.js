/**
 * Creates the grid picker UI.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createGridPickerUI(element) {
  var backgroundTilesLink = document.createElement('a');
  backgroundTilesLink.href = '#';
  backgroundTilesLink.onclick = function() {
    game.editorMode.changeEditingModeIndex(EDITING_MODE.BACKGROUND);
  };
  element.appendChild(backgroundTilesLink);
  var backgroundTilesText = document.createTextNode('Background');
  backgroundTilesLink.appendChild(backgroundTilesText);

  var space1 = document.createTextNode(' ');
  element.appendChild(space1);

  var foregroundTilesLink = document.createElement('a');
  foregroundTilesLink.href = '#';
  foregroundTilesLink.onclick = function() {
    game.editorMode.changeEditingModeIndex(EDITING_MODE.FOREGROUND);
  };
  element.appendChild(foregroundTilesLink);
  var foregroundTilesText = document.createTextNode('Foreground');
  foregroundTilesLink.appendChild(foregroundTilesText);

  var space2 = document.createTextNode(' ');
  element.appendChild(space2);

  var enemiesLink = document.createElement('a');
  enemiesLink.href = '#';
  enemiesLink.onclick = function() {
    game.editorMode.changeEditingModeIndex(EDITING_MODE.ENEMIES);
  };
  element.appendChild(enemiesLink);
  var enemiesText = document.createTextNode('Enemies');
  enemiesLink.appendChild(enemiesText);

}
