/**
 * Function to create a platform with all the respective logic
 */
function createPlatforms(x, y, length) {
  let p = {
    x,
    y,
    length,
    draw: function () {
      push();
      fill(175, 186, 198);
      stroke(33, 32, 45);
      rect(this.x, this.y, this.length, 25);
      pop();
    },
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        let d = this.y - gc_y;
        if (d >= 0 && d < 5) {
          return true;
        }

        return false;
      }
    },
  };

  return p;
}
