var jumpPickups;

/**
 * Function to create a jump pickup
 */
function createJumpPickup(x, y) {
  let pickup = {
    x,
    y,
    angle: 0,
    draw: function () {
      push();

      let offsetY = sin(this.angle) * 10;
      translate(0, offsetY);

      fill(193, 88, 205);
      rect(this.x, this.y, 30, 40, 10);

      fill(82, 85, 132);
      rect(this.x + 7, this.y - 2.5, 15, 10, 3);

      pop();

      this.angle += 0.05;
    },
    checkContact: function (gc_x, gc_y) {
      if (dist(gc_x, gc_y, this.x, this.y) < 55) {
        return true;
      }

      return false;
    },
    giveMoreJump: function () {
      jumpForce += 50;
    },
  };

  return pickup;
}
