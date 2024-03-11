let startTime;
let currentTime;
let elapsedTime = 0;

/**
 * Draw the time counter
 */
function drawTimeCounter() {
  push();
  textSize(25);
  fill(255, 255, 255);

  let formattedTime = formatTime(elapsedTime);

  text(formattedTime, width / 2 - 25, 30);
  pop();
}

/**
 * Function to format the time elapsed: 00:01:32
 */
function formatTime(elapsedTime) {
  let seconds = floor(elapsedTime / 1000) % 60;
  let minutes = floor(elapsedTime / (1000 * 60)) % 60;
  let hours = floor(elapsedTime / (1000 * 60 * 60));
  let formattedTime = `${nf(hours, 2)}:${nf(minutes, 2)}:${nf(seconds, 2)}`;

  return formattedTime;
}

/**
 * Function to reset the end time counter
 */
function resetTimer() {
  startTime = millis();
}
