function ObstacleEditingMode() {
  return {
    displayText: 'Editing Obstacles',
    handleClickAtColRow: handleClickAtColRow,
  };

  function handleClickAtColRow(col, row, game) {
    // TODO: implement obstacle picker
    game.obstacleGrid.setValueAtColRow(OBSTACLE_GOOMBA, col, row);
    game.obstacles = game.obstacleGrid.data;
    displayObstacleData();
  }
}
