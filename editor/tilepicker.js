function createTilePicker() {
  var tilevalues_v2 = [
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
  var tiles_v2 = [];
  tilevalues_v2.forEach(function(element) {
    tiles_v2.push({
      value: element,
      displayName: TILE_DETAILS[element].displayName,
    });
  });
  var plain_tiles = [
    {value: TILE_ITEM_BLOCK, displayName: 'Generic Item Block'},
  ];
  var underground_tiles = [
    {value: TILE_UNDERGROUND_BG, displayName: 'Underground Background'},
    {value: TILE_BLUE_ROCKS, displayName: 'Underground Rocks'},
  ];
  var castle_tiles = [
    {value: TILE_CASTLE_BRIDGE, displayName: 'Castle Bridge'},
    {value: TILE_CASTLE_CHAIN, displayName: 'Castle Chain'},
    {value: TILE_CASTLE_AXE, displayName: 'Castle Axe'},
  ];
  var tiles = [];
  tiles = tiles.concat(tiles_v2);
  tiles = tiles.concat(castle_tiles);
  tiles = tiles.concat(plain_tiles);
  tiles = tiles.concat(underground_tiles);
  var elements = [];
  elements.push('Select a Tile:');
  elements.push('<select id="tileSelect" onchange="selectTile();">');
  tiles.forEach(function(element) {
    option = '<option value="' + element.value + '">'
      + element.displayName + '</option>';
    elements.push(option);
  });

  document.getElementById('tilePicker').innerHTML = elements.join('');
}

function selectTile() {
  var select = document.getElementById('tileSelect');
  var selectedIndex = select.selectedIndex;
  var selectedOption = select.options[selectedIndex];
  var selectedValue = parseInt(selectedOption.value);
  game.selectedTileValue = selectedValue;
}
