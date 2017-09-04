/**
 * Creates the grid picker UI.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createGridDetailUI(element) {
  var savedIndex = game.editorMode.editingModeIndex;

  var backgroundTilesDetail = document.createElement('div');
  backgroundTilesDetail.id = 'editor.detail.background';
  backgroundTilesDetail.hidden = savedIndex != EDITING_MODE.BACKGROUND;
  createBackgroundTilesDetailUI(backgroundTilesDetail);
  element.appendChild(backgroundTilesDetail);

  var foregroundTilesDetail = document.createElement('div');
  foregroundTilesDetail.id = 'editor.detail.foreground';
  foregroundTilesDetail.hidden = savedIndex != EDITING_MODE.FOREGROUND;
  createForegroundTilesDetailUI(foregroundTilesDetail);
  element.appendChild(foregroundTilesDetail);

  var enemiesDetail = document.createElement('div');
  enemiesDetail.id = 'editor.detail.enemies';
  enemiesDetail.hidden = savedIndex != EDITING_MODE.ENEMIES;
  createEnemiesDetailUI(enemiesDetail);
  element.appendChild(enemiesDetail);
}

function showGridDetailUIForIndex(index) {
  document.getElementById('editor.detail.background').hidden = index != EDITING_MODE.BACKGROUND;
  document.getElementById('editor.detail.foreground').hidden = index != EDITING_MODE.FOREGROUND;
  document.getElementById('editor.detail.enemies').hidden = index != EDITING_MODE.ENEMIES;
}
