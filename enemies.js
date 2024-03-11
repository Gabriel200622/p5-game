// Enemy class
class Enemy {
  constructor(x, y, range) {
    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x;
    this.inc = 1;

    this.update = function () {
      this.currentX += this.inc;

      if (this.currentX >= this.x + this.range) {
        this.inc = -1;
      } else if (this.currentX < this.x) {
        this.inc = 1;
      }
    };

    this.draw = function () {
      push();
      // mob body
      this.update();
      stroke(0);
      fill(205, 158, 125);
      ellipse(this.currentX, this.y, 40, 40);

      // mob head
      let headWidth = 15;
      let headHeight = 20;

      fill(246, 149, 188);
      if (this.inc === 1) {
        // head looking to the right
        rect(this.currentX + 15, this.y, headWidth, headHeight, 5);
        ellipse(this.currentX + 23, this.y + 7, 5, 5);
      } else {
        // head looking to the left
        rect(this.currentX - 30, this.y, headWidth, headHeight, 5);
        ellipse(this.currentX - 23, this.y + 7, 5, 5);
      }

      pop();
    };

    this.checkContact = function (gc_x, gc_y) {
      var d = dist(gc_x, gc_y, this.currentX, this.y);

      if (d < 30) {
        return true;
      }

      return false;
    };
  }
}
