function TileEditingMode() {
  return {
    displayText: 'Editing Tiles',
    handleClickAtColRow: handleClickAtColRow,
    selectedTileValue: TILE_V2_EMPTY,
  };

  function handleClickAtColRow(col, row, game) {
    console.log('gets here');
    console.log(this.selectedTileValue);
    game.allGrids.foregroundTiles.setValueAtColAndRow(col, row, this.selectedTileValue);
    game.gridData = game.allGrids.foregroundTiles.getGridData();
    displayLevelData();
  }
}
