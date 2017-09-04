/**
 * Generates HTML elements for debugging and editing.
 */
function createEditorElements() {
  createLevelWidthForm();
  createWorldPicker();
  createTilePicker();
  createObstaclePicker();
}

/**
 * Loads the last level visited, or the first level if no levels were visited.
 */
function loadFirstLevel() {
  var firstLevelId = persistence.getValue('selectedWorld', 'string', '1-1');
  showLevelId(firstLevelId);
  selectLevelWithId(firstLevelId);
}

/**
 * Loads the level with the given id.
 * @param {string} levelId - The level's ID.
 */
function selectLevelWithId(levelId) {
  var level = worlds[levelId];
  game.loadLevel(level);

  displayNumCols();
  updateBackgroundTilesDetailUI();
  updateForegroundTilesDetailUI();
  updateEnemiesDetailUI();
}
