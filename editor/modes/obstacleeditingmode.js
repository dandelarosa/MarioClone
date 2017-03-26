function ObstacleEditingMode() {
  return {
    displayText: 'Editing Obstacles',
    handleClickAtColRow: handleClickAtColRow,
    selectedValue: OBSTACLE_EMPTY,
  };

  function handleClickAtColRow(col, row, game) {
    game.obstacleGrid.setValueAtColRow(this.selectedValue, col, row);
    game.obstacles = game.obstacleGrid.data;
    displayObstacleData();
  }
}
