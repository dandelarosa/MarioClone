var keyEvents;

function setupInput() {
  keyEvents = new KeyEvents();

  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
};

function keyPressed(evt) {
  keyEvents.setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
};

function keyReleased(evt) {
  keyEvents.setKeyHoldState(evt.keyCode, false);
};
