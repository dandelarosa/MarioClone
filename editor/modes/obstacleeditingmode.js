function ObstacleEditingMode() {
  return {
    displayText: 'Editing Obstacles',
    handleClickAtColRow: handleClickAtColRow,
    selectedValue: ENEMY_NONE,
  };

  function handleClickAtColRow(col, row, editor) {
    editor.allGrids.enemyGrid.setValueAtColAndRow(this.selectedValue, col, row);
    displayObstacleData();
  }
}
