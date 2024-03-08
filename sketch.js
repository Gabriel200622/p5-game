var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var collectables;
var canyons;
var mountains;
var clouds;
var trees_x;
var cameraPosX;

var game_score;
var lives;
var startTimeCounter;
var flagpole;

var isGameOver = false;
var isLevelComplete = false;

var headColor = {
  r: 192,
  g: 192,
  b: 192,
};
var bodyColor = {
  r: 105,
  g: 105,
  b: 105,
};
var bottomColor = {
  r: 0,
  g: 0,
  b: 0,
};

function setup() {
  createCanvas(1024, 576);

  // Initialize the variables
  floorPos_y = (height * 3) / 4;
  // Game lives
  lives = {
    counter: 3,
    xPos: 45,
    yPos: 100,
  };

  startGame();
}

function draw() {
  // Background moves behind the player with a smooth effect
  var targetCameraPosX = gameChar_x - width / 2;
  var smoothingFactor = 0.1;
  cameraPosX += (targetCameraPosX - cameraPosX) * smoothingFactor;

  background(100, 155, 255); // fill the sky blue
  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); // draw some green ground

  push();
  translate(-cameraPosX, 0);

  // draw the trees
  drawTrees();

  // draw the clouds
  drawClouds();

  // draw the mountains
  drawMountains();

  // draw the collectables
  drawCollectables();

  //draw the canyons
  drawCanyons();

  // Draw the game character
  drawCharacter();

  // Render the flagpole
  drawFlagpole();
  pop();

  // Collectables counter
  drawCollectablesCounter();

  // Draw the time counter
  drawTimeCounter();

  // Draw the lives
  drawLives();

  // Check game state (win, lose)
  checkGameState();

  // Prevents any further game logic from happening when the game is over
  if (isGameOver || isLevelComplete) {
    return;
  }

  // Move the character
  moveGameCharacter();

  // Check the state of the flagpole
  checkFlagpole();

  // Check if player die
  checkPlayerDie();
}

/**
 * Function called when the  game starts
 */
function startGame() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  treePos_y = height / 2;
  cameraPosX = 0;

  // Game Score (coins)
  game_score = {
    counter: 0,
    xPos: 45,
    yPos: 40,
  };

  // For the time counter
  startTimeCounter = millis();

  // Flagpole
  flagpole = {
    x_pos: 1200,
    isReached: false,
  };

  // Environment
  trees_x = [300, 500, 900, 10, 1150, 1350, 1550];
  mountains = [
    { x1: 350, x2: 500, x3: 550, y1: 432, y2: 300, y3: 432 },
    { x1: 650, x2: 800, x3: 850, y1: 432, y2: 300, y3: 432 },
  ];
  collectables = [
    { x_pos: 300, y_pos: 400, size: 50, isFound: false },
    { x_pos: 50, y_pos: 400, size: 50, isFound: false },
    { x_pos: 850, y_pos: 400, size: 50, isFound: false },
  ];
  clouds = [
    { x_pos: 200, y_pos: 140 },
    { x_pos: 450, y_pos: 100 },
    { x_pos: 730, y_pos: 150 },
  ];
  canyons = [
    {
      x_pos: 100,
      width: 100,
    },
    {
      x_pos: 960,
      width: 100,
    },
  ];
}

function keyPressed() {
  if (!isPlummeting) {
    if (keyCode === 65) {
      isLeft = true;
    }
    if (keyCode === 68) {
      isRight = true;
    }
    if (keyCode === 87 || keyCode === 32) {
      if (!isFalling) {
        gameChar_y -= 35;
      }
    }
  }
}

function keyReleased() {
  if (keyCode === 65) {
    isLeft = false;
  }
  if (keyCode === 68) {
    isRight = false;
  }
}

function checkGameState() {
  if (isGameOver || isLevelComplete) {
    // Black screen with opacity
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);

    // Display a message in the middle of the screen
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);

    if (isGameOver) {
      text("Game over. Press space to continue.", width / 2, height / 2);
    } else if (isLevelComplete) {
      text("Level complete. Press space to continue.", width / 2, height / 2);
    }

    return;
  }
}

/**
 * Function to move the game character
 */
function moveGameCharacter() {
  if (isLeft && !isPlummeting) {
    gameChar_x -= 4;
  }
  if (isRight && !isPlummeting) {
    gameChar_x += 4;
  }
  if (gameChar_y < floorPos_y) {
    gameChar_y += 1;
    isFalling = true;
  } else {
    isFalling = false;
    isPlummeting = false;
  }
}

/**
 * Draw the time counter
 */
function drawTimeCounter() {
  push();
  textSize(25);
  fill(255, 255, 255);
  let elapsedTime = millis() - startTimeCounter;
  let seconds = floor(elapsedTime / 1000) % 60;
  let minutes = floor(elapsedTime / (1000 * 60)) % 60;
  let hours = floor(elapsedTime / (1000 * 60 * 60));
  let formattedTime = `${nf(hours, 2)}:${nf(minutes, 2)}:${nf(seconds, 2)}`;

  text(formattedTime, width / 2 - 25, 30);
  pop();
}

/**
 * Draw the collectables counter
 */
function drawCollectablesCounter() {
  push();
  // Text
  textSize(32);
  fill(255, 255, 255);
  text(game_score.counter.toString(), game_score.xPos, game_score.yPos);

  // Icon
  drawCollectable({
    x_pos: game_score.xPos - 18,
    y_pos: game_score.yPos - 11.5,
    size: 25,
    isFound: false,
  });
  pop();
}

/**
 * Draw the lives counter
 */
function drawLives() {
  push();
  // Text
  textSize(32);
  fill(255, 255, 255);
  text(lives.counter.toString(), lives.xPos, lives.yPos);

  // Icon
  drawHeart(lives.xPos - 18, lives.yPos - 20, 20);
  pop();
}

/**
 * Check if the player dies
 */
function checkPlayerDie() {
  if (gameChar_y > height) {
    lives.counter--;
    if (lives.counter > 0) {
      startGame();
    } else {
      // Set isGameOver to true
      isGameOver = true;
      gameChar_x = width / 2;
      gameChar_y = floorPos_y;
    }
  }
}

/**
 * Function to move the game character
 */
function drawCharacter() {
  if (isLeft && isFalling) {
    // add your jumping-left code
    // Head
    fill(headColor.r, headColor.g, headColor.b);
    ellipse(gameChar_x, gameChar_y - 65, 30, 30);

    // Eyes
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    ellipse(gameChar_x - 5, gameChar_y - 69, 10, 10);

    // Body
    fill(bodyColor.r, bodyColor.g, bodyColor.b);
    rect(gameChar_x - 10.5, gameChar_y - 49, 20, 30);

    // Arms
    strokeWeight(2);
    stroke(51);
    rect(gameChar_x - 5.5, gameChar_y - 44, 10, 25);

    // Bottom
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    rect(gameChar_x - 10.5, gameChar_y - 18, 8, 8);
    rect(gameChar_x + 1.5, gameChar_y - 18, 8, 8);
  } else if (isRight && isFalling) {
    // add your jumping-right code
    // Head
    fill(headColor.r, headColor.g, headColor.b);
    ellipse(gameChar_x, gameChar_y - 65, 30, 30);

    // Eyes
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    ellipse(gameChar_x + 5, gameChar_y - 69, 10, 10);

    // Body
    fill(bodyColor.r, bodyColor.g, bodyColor.b);
    rect(gameChar_x - 10.5, gameChar_y - 49, 20, 30);

    // Arms
    strokeWeight(2);
    stroke(51);
    rect(gameChar_x - 5.5, gameChar_y - 44, 10, 25);

    // Bottom
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    rect(gameChar_x - 10.5, gameChar_y - 18, 8, 8);
    rect(gameChar_x + 1.5, gameChar_y - 18, 8, 8);
  } else if (isLeft) {
    // add your walking left code
    // Head
    fill(headColor.r, headColor.g, headColor.b);
    ellipse(gameChar_x, gameChar_y - 59, 30, 30);

    // Eyes
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    ellipse(gameChar_x - 5, gameChar_y - 63, 10, 10);

    // Body
    fill(bodyColor.r, bodyColor.g, bodyColor.b);
    rect(gameChar_x - 10.5, gameChar_y - 43, 20, 35);

    // Arms
    strokeWeight(2);
    stroke(51);
    rect(gameChar_x - 5.5, gameChar_y - 38, 10, 25);

    // Bottom
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    rect(gameChar_x - 10.5, gameChar_y - 8, 8, 8);
    rect(gameChar_x + 1.5, gameChar_y - 8, 8, 8);
  } else if (isRight) {
    // add your walking right code
    // Head
    fill(headColor.r, headColor.g, headColor.b);
    ellipse(gameChar_x, gameChar_y - 59, 30, 30);

    // Eyes
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    ellipse(gameChar_x + 5, gameChar_y - 63, 10, 10);

    // Body
    fill(bodyColor.r, bodyColor.g, bodyColor.b);
    rect(gameChar_x - 10.5, gameChar_y - 43, 20, 35);

    // Arms
    strokeWeight(2);
    stroke(51);
    rect(gameChar_x - 5.5, gameChar_y - 38, 10, 25);

    // Bottom
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    rect(gameChar_x - 10.5, gameChar_y - 8, 8, 8);
    rect(gameChar_x + 1.5, gameChar_y - 8, 8, 8);
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    // Head
    fill(headColor.r, headColor.g, headColor.b);
    ellipse(gameChar_x, gameChar_y - 67, 30, 30);

    // Eyes
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    ellipse(gameChar_x - 6, gameChar_y - 73, 10, 10);
    ellipse(gameChar_x + 6, gameChar_y - 73, 10, 10);

    // Body
    fill(bodyColor.r, bodyColor.g, bodyColor.b);
    rect(gameChar_x - 12.5, gameChar_y - 54, 25, 35);

    // Arms
    strokeWeight(2);
    stroke(51);
    rect(gameChar_x - 18.5, gameChar_y - 50, 10, 25);
    rect(gameChar_x + 9.5, gameChar_y - 50, 10, 25);

    // Bottom
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    rect(gameChar_x - 15, gameChar_y - 20, 10, 8);
    rect(gameChar_x + 5.5, gameChar_y - 20, 10, 8);
  } else {
    // add your standing front facing code
    // Head
    fill(headColor.r, headColor.g, headColor.b);
    ellipse(gameChar_x, gameChar_y - 59, 30, 30);

    // Eyes
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    ellipse(gameChar_x - 6, gameChar_y - 63, 10, 10);
    ellipse(gameChar_x + 6, gameChar_y - 63, 10, 10);

    // Body
    fill(bodyColor.r, bodyColor.g, bodyColor.b);
    rect(gameChar_x - 12.5, gameChar_y - 43, 25, 35);

    // Arms
    strokeWeight(2);
    stroke(51);
    rect(gameChar_x - 14.5, gameChar_y - 38, 10, 25);
    rect(gameChar_x + 5.5, gameChar_y - 38, 10, 25);

    // Bottom
    fill(bottomColor.r, bottomColor.g, bottomColor.b);
    rect(gameChar_x - 15, gameChar_y - 8, 10, 8);
    rect(gameChar_x + 5, gameChar_y - 8, 10, 8);
  }
}

/**
 * Function to draw a single cloud
 */
function drawCloud(cloud) {
  fill(255, 255, 255);
  ellipse(cloud.x_pos, cloud.y_pos, 50, 50);
  ellipse(cloud.x_pos + 30, cloud.y_pos, 70, 70);
  ellipse(cloud.x_pos + 60, cloud.y_pos, 50, 50);
}

/**
 * Function to draw a single collectable
 */
function drawCollectable(t_collectable) {
  if (!t_collectable.isFound) {
    fill(255, 255, 0);
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos,
      t_collectable.size,
      t_collectable.size
    );
    fill(255, 165, 0);
    ellipse(t_collectable.x_pos, t_collectable.y_pos, 10, 10);
    noStroke();
  }

  // Check if the player interacts with the collectable
  if (
    dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 50
  ) {
    if (!t_collectable.isFound) {
      game_score.counter += 1;
      t_collectable.isFound = true;
    }
  }
}

/**
 * Function to draw a heart
 */
function drawHeart(x, y, size) {
  beginShape();
  fill(255, 0, 0);
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

/**
 * Function to draw a single canyon
 */
function drawCanyon(t_canyon) {
  fill(100, 155, 255);
  rect(t_canyon.x_pos, 432, t_canyon.width, 150);

  if (
    gameChar_x > t_canyon.x_pos &&
    gameChar_x < t_canyon.x_pos + t_canyon.width - 10 &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
    gameChar_y += 2;
  }
}

/**
 * Function to draw a single mountain
 */
function drawMountain(mountain) {
  fill(92, 92, 92);
  triangle(
    mountain.x1,
    mountain.y1,
    mountain.x2,
    mountain.y2,
    mountain.x3,
    mountain.y3
  );
}
/**
 * Function to draw a single tree
 */
function drawTree(treeX) {
  fill(120, 100, 40);
  rect(treeX, treePos_y - 6, 60, 150);
  fill(0, 155, 0);
  triangle(treeX - 50, 282, treeX + 30, 200, treeX + 110, 282);
  triangle(treeX - 50, 230, treeX + 30, 148, treeX + 110, 230);
  noStroke();
}

/**
 * Function to draw multiple trees
 */
function drawTrees() {
  for (var i = 0; i < trees_x.length; i++) {
    treePos_x = trees_x[i];

    drawTree(treePos_x);
  }
}
/**
 * Function to draw multiple clouds
 */
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    drawCloud(clouds[i]);
  }
}

/**
 * Function to draw multiple mountains
 */
function drawMountains() {
  for (var i = 0; i < mountains.length; i++) {
    drawMountain(mountains[i]);
  }
}

/**
 * Function to draw multiple collectables
 */
function drawCollectables() {
  for (var i = 0; i < collectables.length; i++) {
    drawCollectable(collectables[i]);
  }
}

/**
 * Function to draw multiple canyons
 */
function drawCanyons() {
  for (var i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
  }
}

/**
 * Draw the flagpole
 */
function drawFlagpole() {
  // Function to render the flag, receive a yPos to render in a determinate position
  function baseFlagpole(yPos) {
    fill(253, 25, 26);
    noStroke();
    rect(flagpole.x_pos + 2.5, yPos, 65, 50);
  }

  push();

  // Stick
  noStroke();
  fill(255, 255, 255);
  rect(flagpole.x_pos - 2.5, floorPos_y - 250, 5, 250);

  // Base
  noStroke();
  fill(155, 58, 3);
  rect(flagpole.x_pos - 25, floorPos_y - 30, 50, 30);

  // Flag
  if (flagpole.isReached) {
    baseFlagpole(floorPos_y - 250);
  } else {
    baseFlagpole(floorPos_y - 80);
  }

  pop();
}

/**
 * Function to check the state of the flagpole
 */
function checkFlagpole() {
  if (!flagpole.isReached) {
    if (dist(gameChar_x, gameChar_y, flagpole.x_pos, floorPos_y - 30) < 50) {
      flagpole.isReached = true;
      isLevelComplete = true;
    }
  }
}
