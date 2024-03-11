var headColor = {
  r: 253,
  g: 222,
  b: 168,
};
var bodyColor = {
  r: 50,
  g: 97,
  b: 250,
};
var bottomColor = {
  r: 0,
  g: 0,
  b: 0,
};
var jumpForce;
var jumpSound;

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
    let isContactWithPlatform = false;

    for (let i = 0; i < platforms.length; i++) {
      if (platforms[i].checkContact(gameChar_x, gameChar_y)) {
        isFalling = false;
        isPlummeting = false;
        isContactWithPlatform = true;
      }
    }

    if (!isContactWithPlatform) {
      gameChar_y += 3;
      isFalling = true;
    }
  } else {
    isFalling = false;
    isPlummeting = false;
  }
}

/**
 * Reset the position of the character
 */
function resetGameCharPos() {
  gameChar_x = 10;
}
