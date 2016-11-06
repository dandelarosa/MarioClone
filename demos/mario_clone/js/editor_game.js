function EditorGame(services, firstLevel) {
  Game.call(this, services, firstLevel);
}

EditorGame.prototype = Object.create(Game.prototype);
EditorGame.prototype.constructor = EditorGame;
