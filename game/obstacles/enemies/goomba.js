function Goomba(spawnPoint) {
  this.rect = new Rect2D(spawnPoint.x, spawnPoint.y, 16, 16);
  this.speedX = -1;
  this.speedY = 0;
}

Goomba.prototype = (function() {
  return {
    draw: draw,
    getRect: getRect,
    update: update,
  };

  function getRect() {
    return this.rect;
  }

  function update(tiles) {
    var rect = this.getRect();

    if (!this.onGround) {
      this.speedY += GRAVITY;
      // cheap test to ensure can't fall through floor
      if (this.speedY > JUMPER_RADIUS) {
        this.speedY = JUMPER_RADIUS;
      }
    }

    var topY = rect.y;
    var bottomY = rect.y + rect.height;
    var leftX = rect.x;
    var rightX = rect.x + rect.width;
    var futureTopY = rect.y + this.speedY;
    var futureBottomY = rect.y + rect.height + this.speedY;
    var futureLeftX = rect.x + this.speedX;
    var futureRightX = rect.x + rect.width + this.speedX;

    if (this.speedX < 0 && leftX <= tiles.minX()) {
      rect.x = tiles.minX();
      this.speedX = 0.0;
    }
    else if (this.speedX > 0 && rightX >= tiles.maxX()) {
      rect.x = tiles.maxX() - rect.width;
      this.speedX = 0.0;
    }

    // If future top side is inside a wall, push to row below
    if (this.speedY < 0 && tiles.isSolidAtPoint(rect.x, futureTopY)) {
      rect.y = Math.floor(rect.y / tiles.getTileHeight()) * tiles.getTileHeight();
      this.speedY = 0.0;
    }
    else if (this.speedY < 0 && tiles.isSolidAtPoint(rightX - 1, futureTopY)) {
      rect.y = Math.floor(rect.y / tiles.getTileHeight()) * tiles.getTileHeight();
      this.speedY = 0.0;
    }
    // If future bottom side is inside a wall, push to row above
    else if (this.speedY > 0 && tiles.isSolidAtPoint(leftX, futureBottomY)) {
      rect.y = (Math.floor(futureBottomY / tiles.getTileHeight())) * tiles.getTileHeight() - rect.height;
      this.onGround = true;
      this.speedY = 0;
    }
    else if (this.speedY > 0 && tiles.isSolidAtPoint(rightX - 1, futureBottomY)) {
      rect.y = (Math.floor(futureBottomY / tiles.getTileHeight())) * tiles.getTileHeight() - rect.height;
      this.onGround = true;
      this.speedY = 0;
    }
    else if (tiles.isSolidAtPoint(rect.x, rect.y + rect.height + 2) == 0) {
      this.onGround = false;
    }

    // If left side is already inside a wall, push to the column to the right
    if (this.speedX < 0 && (tiles.isSolidAtPoint(futureLeftX, topY))) {
      rect.x = Math.floor(leftX / tiles.getTileWidth()) * tiles.getTileWidth();
      this.speedX = -this.speedX;
    }
    else if (this.speedX < 0 && (tiles.isSolidAtPoint(futureLeftX, bottomY - 1))) {
      rect.x = Math.floor(leftX / tiles.getTileWidth()) * tiles.getTileWidth();
      this.speedX = -this.speedX;
    }
    // If right side is already inside a wall, push to the column to the left
    else if (this.speedX > 0 && (tiles.isSolidAtPoint(futureRightX, topY))) {
      rect.x = Math.ceil(rightX / tiles.getTileWidth()) * tiles.getTileWidth() - rect.width;
      this.speedX = -this.speedX;
    }
    else if (this.speedX > 0 && (tiles.isSolidAtPoint(futureRightX, bottomY - 1))) {
      rect.x = Math.ceil(rightX / tiles.getTileWidth()) * tiles.getTileWidth() - rect.width;
      this.speedX = -this.speedX;
    }

    rect.x += this.speedX; // move the jumper based on its current horizontal speed
    rect.y += this.speedY; // same as above, but for vertical
  }

  function draw(graphics) {
    var rect = this.getRect();
    graphics.fillRect(rect.x, rect.y, rect.width, rect.height, 'red');
  }
})();
