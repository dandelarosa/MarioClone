function createTilePicker() {
  var tiles = [
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
  ];
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
