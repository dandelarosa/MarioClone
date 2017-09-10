/**
 * The values that will appear on the background tile picker, listed in order.
 */
const BACKGROUND_PICKER_TILE_LIST = [
  TILE_V2_EMPTY,
  TILE_V2_GROUND_BLOCK,
  TILE_V2_SOLID_BLOCK,
  TILE_V2_BRICK_BLOCK,
  TILE_V2_ITEM_BLOCK,
  TILE_V2_EMPTY_BLOCK,
  TILE_V2_COIN,
  TILE_V2_PIPE_TOP_END_LEFT,
  TILE_V2_PIPE_TOP_END_RIGHT,
  TILE_V2_PIPE_V_LEFT,
  TILE_V2_PIPE_V_RIGHT,
  TILE_V2_PIPE_H_TOP,
  TILE_V2_PIPE_H_BOTTOM,
  TILE_V2_PIPE_LEFT_END_TOP,
  TILE_V2_PIPE_LEFT_END_BOTTOM,
  TILE_V2_PIPE_LEFT_INT_TOP,
  TILE_V2_PIPE_LEFT_INT_BOTTOM,
  TILE_V2_CLOUD_UPPER_LEFT,
  TILE_V2_CLOUD_UPPER_CENTER,
  TILE_V2_CLOUD_UPPER_RIGHT,
  TILE_V2_CLOUD_LOWER_LEFT,
  TILE_V2_CLOUD_LOWER_CENTER,
  TILE_V2_CLOUD_LOWER_RIGHT,
  TILE_V2_HILL_LEFT,
  TILE_V2_HILL_TOP,
  TILE_V2_HILL_RIGHT,
  TILE_V2_HILL_EYES,
  TILE_V2_HILL_NOEYES,
  TILE_V2_BUSH_LEFT,
  TILE_V2_BUSH_CENTER,
  TILE_V2_BUSH_RIGHT,
  TILE_V2_TREE_TOP_LEFT,
  TILE_V2_TREE_TOP_CENTER,
  TILE_V2_TREE_TOP_RIGHT,
  TILE_V2_TREE_TRUNK,
  TILE_V2_FLAGPOLE_TOP,
  TILE_V2_FLAGPOLE_MID,
  TILE_V2_CASTLE_TOP,
  TILE_V2_CASTLE_WINDOWLEFT,
  TILE_V2_CASTLE_WINDOWRIGHT,
  TILE_V2_CASTLE_BRICKS,
  TILE_V2_CASTLE_DOORTOP,
  TILE_V2_CASTLE_DOORMIDDLE,
  TILE_V2_CASTLE_TOPMIDDLE,
  TILE_V2_LAVA_TOP,
  TILE_V2_LAVA_MIDDLE,
  TILE_V2_BRIDGE,
  TILE_V2_BRIDGE_CHAIN,
  TILE_V2_AXE,
];

/**
 * Creates the detail UI for background tiles.
 * @param {Object} element - The HTML element that should contain the UI.
 */
function createBackgroundTilesDetailUI(element) {
  var selectElement = document.createElement('select');
  selectElement.id = 'backgroundTileSelect';
  selectElement.onchange = selectBackgroundTile;

  var storedValue = game.editorMode.editingModeManager.backgroundEditingMode.selectedTileValue;
  var indexOfStoredValue = 0;
  for (var i = 0; i < BACKGROUND_PICKER_TILE_LIST.length; i++) {
    var value = BACKGROUND_PICKER_TILE_LIST[i];
    var optionElement = document.createElement('option');
    optionElement.value = value;
    if (value === storedValue) {
      indexOfStoredValue = i;
    }
    var optionText = document.createTextNode(TILE_DETAILS[value].displayName);
    optionElement.appendChild(optionText);

    selectElement.appendChild(optionElement);
  }
  selectElement.selectedIndex = indexOfStoredValue;
  element.appendChild(selectElement);

  var textField = document.createElement('input');
  textField.id = 'editor.detail.background.data';
  textField.type = 'text';
  textField.value = getDataForBackgroundTilesDetailUI();
  element.appendChild(textField);
}

/**
 * Updates the background tiles detail UI with the most recent data.
 */
function updateBackgroundTilesDetailUI() {
  var input = document.getElementById('editor.detail.background.data');
  if (!input) {
    return;
  }
  var value = getDataForBackgroundTilesDetailUI();
  input.value = value;
}

/**
 * Gets the data to display on the background tiles detail UI.
 * @returns {number[]} A list of numbers to display.
 */
function getDataForBackgroundTilesDetailUI() {
  return twoDigitHexArray(game.editorMode.allGrids.backgroundTiles.data);
}

/**
 * Handles the selection of a background tile
 */
function selectBackgroundTile() {
  var select = document.getElementById('backgroundTileSelect');
  var selectedIndex = select.selectedIndex;
  var selectedOption = select.options[selectedIndex];
  var selectedValue = parseInt(selectedOption.value);
  game.editorMode.editingModeManager.backgroundEditingMode.handleSelectedValue(selectedValue);
}
