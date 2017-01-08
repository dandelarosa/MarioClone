function createTilePicker() {
  var plain_tiles = [
    {value: TILE_BLUE_SKY, displayName: 'Blue Sky'},
    {value: TILE_BROWN_GROUND, displayName: 'Brown Ground'},
    {value: TILE_CLOUD_UL, displayName: 'Cloud Upper Left'},
    {value: TILE_CLOUD_UC, displayName: 'Cloud Upper Center'},
    {value: TILE_CLOUD_UR, displayName: 'Cloud Upper Right'},
    {value: TILE_CLOUD_LL, displayName: 'Cloud Lower Left'},
    {value: TILE_CLOUD_LC, displayName: 'Cloud Lower Center'},
    {value: TILE_CLOUD_LR, displayName: 'Cloud Lower Right'},
    {value: TILE_BUSH_LEFT, displayName: 'Bush Left'},
    {value: TILE_BUSH_CENTER, displayName: 'Bush Center'},
    {value: TILE_BUSH_RIGHT, displayName: 'Bush Right'},
    {value: TILE_HILL_LEFT, displayName: 'Hill - Left Slope'},
    {value: TILE_HILL_TOP, displayName: 'Hill - Top'},
    {value: TILE_HILL_RIGHT, displayName: 'Hill - Right'},
    {value: TILE_HILL_EYES, displayName: 'Hill - Eyes'},
    {value: TILE_HILL_NOEYES, displayName: 'Hill - No Eyes'},
    {value: TILE_CASTLE_TOP, displayName: 'Castle - Top'},
    {value: TILE_CASTLE_WINDOWLEFT, displayName: 'Castle - Window Left'},
    {value: TILE_CASTLE_WINDOWRIGHT, displayName: 'Castle - Window Right'},
    {value: TILE_CASTLE_BRICKS, displayName: 'Castle - All Bricks'},
    {value: TILE_CASTLE_DOORTOP, displayName: 'Castle - Door Top'},
    {value: TILE_CASTLE_DOORMIDDLE, displayName: 'Castle - Door Middle'},
    {value: TILE_CASTLE_TOPMIDDLE, displayName: 'Castle - Top Middle'},
    {value: TILE_PIPE_TOP_LEFT, displayName: 'Pipe - Top Left'},
    {value: TILE_PIPE_TOP_RIGHT, displayName: 'Pipe - Top Right'},
    {value: TILE_PIPE_MID_LEFT, displayName: 'Pipe - Mid Left'},
    {value: TILE_PIPE_MID_RIGHT, displayName: 'Pipe - Mid Right'},
    {value: TILE_FLAGPOLE_TOP, displayName: 'Flagpole - Top'},
    {value: TILE_FLAGPOLE_MID, displayName: 'Flagpole - Middle'},
    {value: TILE_SOLID_BLOCK, displayName: 'Solid Block'},
    {value: TILE_ITEM_BLOCK, displayName: 'Generic Item Block'},
    {value: TILE_TREE_TOP_LEFT, displayName: 'Treetop Left'},
    {value: TILE_TREE_TOP_CENTER, displayName: 'Treetop Center'},
    {value: TILE_TREE_TOP_RIGHT, displayName: 'Treetop Right'},
    {value: TILE_TREE_TRUNK, displayName: 'Tree Trunk'},
  ];
  var underground_tiles = [
    {value: TILE_UNDERGROUND_BG, displayName: 'Underground Background'},
    {value: TILE_BLUE_ROCKS, displayName: 'Underground Rocks'},
    {value: TILE_BLUE_BLOCK, displayName: 'Underground Solid Block'},
    {value: TILE_BLUE_BRICK_BLOCK, displayName: 'Underground Brick Block'},
    {value: TILE_UNDERGROUND_PIPE_TOP_END_LEFT, displayName: 'Underground Pipe - Top End Left'},
    {value: TILE_UNDERGROUND_PIPE_TOP_END_RIGHT, displayName: 'Underground Pipe - Top End Right'},
    {value: TILE_UNDERGROUND_PIPE_V_LEFT, displayName: 'Underground Pipe - Vertical Left'},
    {value: TILE_UNDERGROUND_PIPE_V_RIGHT, displayName: 'Underground Pipe - Vertical Right'},
    {value: TILE_UNDERGROUND_PIPE_H_TOP, displayName: 'Underground Pipe - Horizontal Top'},
    {value: TILE_UNDERGROUND_PIPE_H_BOTTOM, displayName: 'Underground Pipe - Horizontal Bottom'},
    {value: TILE_UNDERGROUND_PIPE_LEFT_END_TOP, displayName: 'Underground Pipe - Left End Top'},
    {value: TILE_UNDERGROUND_PIPE_LEFT_END_BOTTOM, displayName: 'Underground Pipe - Left End Bottom'},
    {value: TILE_UNDERGROUND_PIPE_LEFT_INT_TOP, displayName: 'Underground Pipe - Left Intersection Top'},
    {value: TILE_UNDERGROUND_PIPE_LEFT_INT_BOTTOM, displayName: 'Underground Pipe - Left Intersection Bottom'},
  ];
  var tiles = [];
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
