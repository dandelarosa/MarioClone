var fpsString;
var lastRecordedTime;
var currentIndexForFPS = 0;
var samplesForFPS = [];
const MAX_SAMPLES_FOR_FPS = 100;

function measureFPS() {
  var currentTime = new Date().getTime();

  if (lastRecordedTime) {
    var timeElasped = currentTime - lastRecordedTime;
    if (samplesForFPS.length < MAX_SAMPLES_FOR_FPS) {
      samplesForFPS.push(timeElasped);
    }
    else {
      if (currentIndexForFPS >= MAX_SAMPLES_FOR_FPS) {
        currentIndexForFPS = 0;
      }
      samplesForFPS[currentIndexForFPS] = timeElasped;
    }
    currentIndexForFPS++;

    var totalMiliseconds = 0;
    for (var i = 0; i < samplesForFPS.length; i++) {
      totalMiliseconds += samplesForFPS[i];
    }
    var totalSeconds = totalMiliseconds / 1000;
    var fps = Math.round(samplesForFPS.length / totalSeconds);
    fpsString = fps.toString() + ' FPS';
  }
  else {
    fpsString = 'N/A';
  }

  lastRecordedTime = currentTime;
}
