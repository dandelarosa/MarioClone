function Level1() {
  this.bricks = new Bricks();
  this.jumper = new Jumper();
};

Level1.prototype.update = function() {
  this.jumper.move();
};

Level1.prototype.draw = function(graphics) {
  graphics.fillWholeScreen('black');

  this.bricks.draw(graphics);

  graphics.colorText("Arrow keys to run, spacebar to jump", 8, 14, "white");

  graphics.colorCircle(jumperX, jumperY, JUMPER_RADIUS, 'white')
};
