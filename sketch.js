var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var isCanyonFalling = false;
var collectables;
var canyons;
var mountains;
var clouds;
var trees_x;
var cameraPosX;

var game_score;
var lives;
var flagpole;

var isGameOver = false;
var isLevelComplete = false;
var platforms;
var enemies;

var coinPickedSound;

function preload() {
  soundFormats("wav");
  jumpSound = loadSound("assets/jumpSound2");
  coinPickedSound = loadSound("assets/coin");
}

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

  // draw the mountains
  drawMountains();

  // draw the trees
  drawTrees();

  // draw the clouds
  drawClouds();

  // draw the collectables
  drawCollectables();

  // draw the canyons
  drawCanyons();

  // draw the platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  // draw the pickups
  for (let i = 0; i < jumpPickups.length; i++) {
    jumpPickups[i].draw();

    let isContact = jumpPickups[i].checkContact(gameChar_x, gameChar_y);

    if (isContact) {
      jumpPickups[i].giveMoreJump();
      jumpPickups = jumpPickups.filter((p) => p.x !== jumpPickups[i].x);
    }
  }

  // draw the enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();

    var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);

    if (isContact) {
      if (lives.counter > 0) {
        lives.counter--;

        startGame();
        break;
      }
    }
  }

  // Render the flagpole
  drawFlagpole();

  // Draw the game character
  drawCharacter();
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

  if (!isGameOver && !isLevelComplete) {
    currentTime = millis();
    elapsedTime = currentTime - startTime;
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
  resetGameCharPos();
  gameChar_y = floorPos_y;
  treePos_y = height / 2;
  cameraPosX = 0;
  jumpForce = 100;

  // Game Score (coins)
  game_score = {
    counter: 0,
    xPos: 45,
    yPos: 40,
  };

  // Flagpole
  flagpole = {
    x_pos: 3000,
    isReached: false,
  };

  // For the time counter
  resetTimer();

  // Environment
  collectables = [
    { x_pos: 555, y_pos: floorPos_y - 235, size: 35, isFound: false },
    { x_pos: 1450, y_pos: floorPos_y - 220, size: 35, isFound: false },
  ];

  clouds = generateRandomClouds(-1000, 5000, 50, 180, 200, 300);
  canyons = generateRandomCanyons(-1000, 5000, 100, 500, 1000, [
    // Skip the position of the player
    { x_pos: gameChar_x, width: 50 },
    // Skip the position of the flagpole
    { x_pos: 2990, width: 100 },
  ]);
  trees_x = generateRandomTrees(-1000, 5000, 200, 300, [...canyons]);

  collectables = [
    ...collectables,
    ...generateRandomCoin(-1000, 5000, 35, 400, 600, []),
  ];

  const randomMountains = generateRandomMountains(-1000, 5000, 500, 200, 300, [
    ...canyons,
  ]);
  mountains = randomMountains;

  const randomEnemies = generateRandomEnemies(
    100,
    5000,
    50,
    floorPos_y - 25,
    300,
    500,
    [
      // Skip the positions of the canyons
      ...canyons,
      // Skip the position of the flagpole
      { x_pos: 2990, width: 100 },
    ]
  );
  enemies = randomEnemies.map((enemy) => {
    return new Enemy(enemy.x, enemy.y, enemy.range);
  });

  platforms = [];
  platforms.push(
    createPlatforms(500, floorPos_y - 80, 200),
    createPlatforms(350, floorPos_y - 120, 100),
    createPlatforms(480, floorPos_y - 185, 150),
    createPlatforms(1380, floorPos_y - 50, 150),
    createPlatforms(1280, floorPos_y - 120, 150),
    createPlatforms(1380, floorPos_y - 180, 150)
  );
  jumpPickups = [];
  jumpPickups.push(createJumpPickup(385, floorPos_y - 170));

  isCanyonFalling = false;
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
      if (isGameOver || isLevelComplete) {
        // Reset the lives
        lives.counter = 3;

        // Reset end timer
        resetTimer();

        isGameOver = false;
        isLevelComplete = false;
        startGame();
        return;
      }

      if (!isFalling && !isPlummeting) {
        if (!isCanyonFalling) {
          jumpSound.play();

          gameChar_y -= jumpForce;
        }
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
    push();
    // Black screen with opacity
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);

    // Display a message in the middle of the screen
    textSize(32);
    textAlign(CENTER);
    fill(255);

    if (isGameOver) {
      text("Game over. Press space to continue.", width / 2, height / 2);
    } else if (isLevelComplete) {
      // Draw the time in that the user completed the game
      push();
      textSize(20);
      fill(255, 255, 255);

      let formattedTime = formatTime(elapsedTime);

      textAlign(CENTER, CENTER);
      text(`Level completed in: ${formattedTime}`, width / 2, height / 2 - 50);
      pop();

      text("Level complete. Press space to continue.", width / 2, height / 2);
    }
    pop();

    return;
  }
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
      resetGameCharPos();
      gameChar_y = floorPos_y;
    }
  } else if (lives.counter < 1) {
    isGameOver = true;
    resetGameCharPos();
    gameChar_y = floorPos_y;
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
      coinPickedSound.play();
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
    isCanyonFalling = true;
    isPlummeting = true;
    isFalling = true;
    gameChar_y += 3;
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
