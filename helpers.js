/**
 * Function for random tree generation
 * @skipPositions skipPositions: [{ x_pos: x, width: width }]
 */
function generateRandomTrees(
  start,
  end,
  minDistance,
  maxDistance,
  skipPositions
) {
  const array = [start];
  let currentNumber = start;

  while (currentNumber < end) {
    const randomNumber =
      Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
    currentNumber += randomNumber;
    let isValidPosition = true;

    // Check if the current tree position conflicts with any skipped position
    for (const pos of skipPositions) {
      const posStart = pos.x_pos - 50;
      const posEnd = pos.x_pos + pos.width;

      if (currentNumber >= posStart && currentNumber <= posEnd) {
        isValidPosition = false;
        break;
      }
    }

    if (isValidPosition) {
      array.push(currentNumber);
    }
  }

  return array;
}

/**
 * Function for random cloud generation
 */
function generateRandomClouds(
  startX,
  endX,
  startY,
  endY,
  minDistance,
  maxDistance
) {
  const clouds = [];
  let currentX = startX;

  while (currentX < endX) {
    const randomX =
      Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
    currentX += randomX;

    const randomY = Math.floor(Math.random() * (endY - startY + 1)) + startY;

    clouds.push({ x_pos: currentX, y_pos: randomY });
  }

  return clouds;
}

/**
 * Function for random canyon generation
 * @skipPositions skipPositions: [{ x_pos: x, width: width }]
 */
function generateRandomCanyons(
  start,
  end,
  size,
  minDistance,
  maxDistance,
  skipPositions
) {
  const canyons = [];
  let currentNumber = start;

  while (currentNumber < end) {
    const randomNumber =
      Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
    currentNumber += randomNumber;
    let isValidPosition = true;

    // Check if the current tree position conflicts with any skipped position
    for (const pos of skipPositions) {
      const posStart = pos.x_pos - pos.width;
      const posEnd = pos.x_pos + pos.width;

      const nextPos = currentNumber + size;

      if (nextPos >= pos.x_pos && nextPos <= pos.x_pos + pos.width) {
        isValidPosition = false;
        break;
      }

      if (currentNumber >= posStart && currentNumber <= posEnd) {
        isValidPosition = false;
        break;
      }
    }

    if (isValidPosition) {
      canyons.push({ x_pos: currentNumber, width: size });
    }
  }

  return canyons;
}

/**
 * Function for random enemies generation
 * @skipPositions skipPositions: [{ x_pos: x, width: width }]
 */
function generateRandomEnemies(
  start,
  end,
  range,
  yPos,
  minDistance,
  maxDistance,
  skipPositions
) {
  const enemies = [];
  let currentNumber = start;

  while (currentNumber < end) {
    const randomNumber =
      Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
    currentNumber += randomNumber;
    let isValidPosition = true;

    // Check if the current tree position conflicts with any skipped position
    for (const pos of skipPositions) {
      const posStart = pos.x_pos - pos.width;
      const posEnd = pos.x_pos + pos.width;

      const nextPos = currentNumber + range;

      if (nextPos >= pos.x_pos && nextPos <= pos.x_pos + pos.width) {
        isValidPosition = false;
        break;
      }

      if (currentNumber >= posStart && currentNumber <= posEnd) {
        isValidPosition = false;
        break;
      }
    }

    if (isValidPosition) {
      enemies.push({ x: currentNumber, y: yPos, range });
    }
  }

  return enemies;
}

/**
 * Function to create a mountain from a x1
 */
function createMountain(x1) {
  let y1 = 432;
  let y2 = random(200, 300);
  let y3 = 432;

  let x2 = x1 + random(50, 150);
  let x3 = x1 + random(150, 250);

  return { x1, y1, x2, y2, x3, y3 };
}

/**
 * Function for random mountain generation
 * @skipPositions skipPositions: [{ x_pos: x, width: width }]
 */
function generateRandomMountains(
  start,
  end,
  size,
  minDistance,
  maxDistance,
  skipPositions
) {
  const mountains = [];
  let currentNumber = start;

  while (currentNumber < end) {
    const randomNumber =
      Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
    currentNumber += randomNumber;
    let isValidPosition = true;

    // Check if the current tree position conflicts with any skipped position
    for (const pos of skipPositions) {
      const posStart = pos.x_pos - pos.width - 100;
      const posEnd = pos.x_pos + pos.width + 100;

      const nextPos = currentNumber + size + 100;

      if (nextPos >= pos.x_pos && nextPos <= pos.x_pos + pos.width) {
        isValidPosition = false;
        break;
      }

      if (currentNumber >= posStart && currentNumber <= posEnd) {
        isValidPosition = false;
        break;
      }
    }

    if (isValidPosition) {
      mountains.push(createMountain(currentNumber));
    }
  }

  return mountains;
}

/**
 * Function for random coin generation
 * @skipPositions skipPositions: [{ x_pos: x, width: width }]
 */
function generateRandomCoin(
  start,
  end,
  size,
  minDistance,
  maxDistance,
  skipPositions
) {
  const coins = [];
  let currentNumber = start;

  while (currentNumber < end) {
    const randomNumber =
      Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
    currentNumber += randomNumber;
    let isValidPosition = true;

    // Check if the current tree position conflicts with any skipped position
    for (const pos of skipPositions) {
      const posStart = pos.x_pos - pos.width;
      const posEnd = pos.x_pos + pos.width;

      const nextPos = currentNumber + size;

      if (nextPos >= pos.x_pos && nextPos <= pos.x_pos + pos.width) {
        isValidPosition = false;
        break;
      }

      if (currentNumber >= posStart && currentNumber <= posEnd) {
        isValidPosition = false;
        break;
      }
    }

    if (isValidPosition) {
      coins.push({
        x_pos: currentNumber,
        y_pos: 400,
        size: size,
        isFound: false,
      });
    }
  }

  return coins;
}
