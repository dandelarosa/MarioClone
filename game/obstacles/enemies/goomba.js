function Goomba(spawnPoint) {
  this.rect = new Rect2D(spawnPoint.x, spawnPoint.y, 16, 16);
}

Goomba.prototype = (function() {
  return {
    draw: draw,
  };

  function draw(graphics) {
    graphics.fillRect(this.rect.x, this.rect.y, this.rect.width,
      this.rect.height, 'red');
  }
})();
