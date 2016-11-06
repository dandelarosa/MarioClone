function Level1() {
  this.dude = {
    x: 30,
    y: 130,
    width: 20,
    height: 20,
    color: 'blue',
  };
};

Level1.prototype.update = function(services) {

};

Level1.prototype.draw = function(graphics) {
  graphics.fillWholeScreen('black');

  // this is a dude
  graphics.colorRect(this.dude.x, this.dude.y, this.dude.width,
    this.dude.height, this.dude.color);

  var loadingText = "This is a game.";
  graphics.colorText(loadingText, graphics.canvasWidth / 2,
    graphics.canvasHeight / 2, 'yellow');
};
