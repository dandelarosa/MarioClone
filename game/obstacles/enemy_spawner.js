function EnemySpawner() {
}

EnemySpawner.prototype = (function() {
  return {
    spawnWithValueAtPoint: spawnWithValueAtPoint,
  };

  function spawnWithValueAtPoint(value, spawnPoint) {
    var spawnedEnemies = [];
    if (value === OBSTACLE_GOOMBA) {
      spawnedEnemies.push(new Goomba(spawnPoint));
    }
    return spawnedEnemies;
  }
})();
