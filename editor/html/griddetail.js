/**
 * Creates the grid picker UI.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createGridDetailUI(element) {
  var backgroundTilesDetail = document.createElement('div');
  createBackgroundTilesDetailUI(backgroundTilesDetail)
  element.appendChild(backgroundTilesDetail);

  var foregroundTilesDetail = document.createElement('div');
  createForegroundTilesDetailUI(foregroundTilesDetail);
  element.appendChild(foregroundTilesDetail);

  var enemiesDetail = document.createElement('div');
  createEnemiesDetailUI(enemiesDetail);
  element.appendChild(enemiesDetail);
}
