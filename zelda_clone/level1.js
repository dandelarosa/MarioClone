const RUN_SPEED = 5.5;

var camPanX = 0.0;
var camPanY = 0.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

const BRICK_W = 60;
const BRICK_H = 60;
const BRICK_GAP = 1;
const BRICK_COLS = 20;
const BRICK_ROWS = 15;
var brickGrid =
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
      1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1,
      1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1,
      1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
      1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1,
      1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function Level1() {
  sliderReset();
};

Level1.prototype.update = function(keyEvents) {
  sliderMove(keyEvents);
  cameraFollow();
};

function brickTileToIndex(tileCol, tileRow) {
  return (tileCol + BRICK_COLS*tileRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
  var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return (brickGrid[brickIndex] == 1);
}

function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
  var tileCol = hitPixelX / BRICK_W;
  var tileRow = hitPixelY / BRICK_H;

  // using Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the slider is within any part of the brick wall
  if(tileCol < 0 || tileCol >= BRICK_COLS ||
     tileRow < 0 || tileRow >= BRICK_ROWS) {
     return false;
  }

  var brickIndex = brickTileToIndex(tileCol, tileRow);
  return (brickGrid[brickIndex] == 1);
}

function sliderMove(keyEvents) {
  var nextX = sliderX;
  var nextY = sliderY;

  if(keyEvents.holdLeft) {
    nextX += -RUN_SPEED;
  }
  if(keyEvents.holdRight) {
    nextX += RUN_SPEED;
  }
  if(keyEvents.holdUp) {
    nextY += -RUN_SPEED;
  }
  if(keyEvents.holdDown) {
    nextY += RUN_SPEED;
  }

  if(isBrickAtPixelCoord(nextX,nextY) == false) {
    sliderX = nextX;
    sliderY = nextY;
  }
}

function sliderReset() {
  // center slider on screen
  sliderX = GAME_WIDTH / 2;
  sliderY = GAME_HEIGHT / 2;
}

function instantCamFollow() {
  camPanX = sliderX - GAME_WIDTH / 2;
  camPanY = sliderY - GAME_HEIGHT / 2;
}

function cameraFollow() {
  var cameraFocusCenterX = camPanX + GAME_WIDTH / 2;
  var cameraFocusCenterY = camPanY + GAME_HEIGHT / 2;

  var playerDistFromCameraFocusX = Math.abs(sliderX-cameraFocusCenterX);
  var playerDistFromCameraFocusY = Math.abs(sliderY-cameraFocusCenterY);

  if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
    if(cameraFocusCenterX < sliderX)  {
      camPanX += RUN_SPEED;
    } else {
      camPanX -= RUN_SPEED;
    }
  }
  if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
    if(cameraFocusCenterY < sliderY)  {
      camPanY += RUN_SPEED;
    } else {
      camPanY -= RUN_SPEED;
    }
  }

  // instantCamFollow();

  // this next code blocks the game from showing out of bounds
  // (this isn't required, if you don't mind seeing beyond edges)
  if(camPanX < 0) {
    camPanX = 0;
  }
  if(camPanY < 0) {
    camPanY = 0;
  }
  var maxPanRight = BRICK_COLS * BRICK_W - GAME_WIDTH;
  var maxPanTop = BRICK_ROWS * BRICK_H - GAME_HEIGHT;
  if(camPanX > maxPanRight) {
    camPanX = maxPanRight;
  }
  if(camPanY > maxPanTop) {
    camPanY = maxPanTop;
  }
}

Level1.prototype.draw = function(graphics) {
  drawEverything(graphics);
};

function drawEverything(graphics) {
  graphics.fillWholeScreen('black');

  graphics.context2d.save(); // needed to undo this .translate() used for scroll

  // this next line is like subtracting camPanX and camPanY from every
  // canvasContext draw operation up until we call canvasContext.restore
  // this way we can just draw them at their "actual" position coordinates
  graphics.context2d.translate(-camPanX,-camPanY);

  //drawBricks();
  drawOnlyBricksOnScreen(graphics);

  graphics.colorCircle(sliderX, sliderY, 10, 'white');

  graphics.context2d.restore(); // undoes the .translate() used for cam scroll

  // doing this after .restore() so it won't scroll with the camera pan
  graphics.context2d.fillStyle = 'white';
  graphics.context2d.fillText("Arrow keys to slide, scrolling demo",8,14);
}

function drawOnlyBricksOnScreen(graphics) {
  // what are the top-left most col and row visible on canvas?
  var cameraLeftMostCol = Math.floor(camPanX / BRICK_W);
  var cameraTopMostRow = Math.floor(camPanY / BRICK_H);

  // how many columns and rows of tiles fit on one screenful of area?
  var colsThatFitOnScreen = Math.floor(GAME_WIDTH / BRICK_W);
  var rowsThatFitOnScreen = Math.floor(GAME_HEIGHT / BRICK_H);

  // finding the rightmost and bottommost tiles to draw.
  // the +1 and + 2 on each pushes the new tile popping in off visible area
  // +2 for columns since BRICK_W doesn't divide evenly into canvas.width
  var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
  var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;

  for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {
    for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {

      if( isBrickAtTileCoord(eachCol, eachRow) ) {
        var brickLeftEdgeX = eachCol * BRICK_W;
        var brickTopEdgeY = eachRow * BRICK_H;
        graphics.colorRect(brickLeftEdgeX, brickTopEdgeY,
                 BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue' );
      } // end of isBrickAtTileCoord()
    } // end of for eachRow
  } // end of for eachCol
} // end of drawBricks()
