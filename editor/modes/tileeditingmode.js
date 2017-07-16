function TileEditingMode() {
  return {
    displayText: 'Editing Tiles',
    handleClickAtColRow: handleClickAtColRow,
    selectedTileValue: TILE_V2_EMPTY,
  };

  function handleClickAtColRow(col, row, game) {
    game.tiles.toggleValueAtColRow(col, row, this.selectedTileValue);
    game.gridData = game.tiles.getGridData();
    displayLevelData();
  }
}
