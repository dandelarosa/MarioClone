function TileEditingMode() {
  return {
    displayText: 'Editing Tiles',
    handleClickAtColRow: handleClickAtColRow,
    selectedTileValue: TILE_BLUE_SKY,
  };

  function handleClickAtColRow(col, row, game) {
    game.bricks.toggleValueAtColRow(col, row, this.selectedTileValue);
    game.gridData = game.bricks.getGridData();
    displayLevelData();
  }
}
