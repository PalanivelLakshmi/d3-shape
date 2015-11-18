import {point} from "./cardinal";

function cardinalOpen(tension) {
  var k = (tension == null ? 1 : 1 - tension) / 6;
  return function(context) {
    return new CardinalOpen(context, k);
  };
}

function CardinalOpen(context, k) {
  this._context = context;
  this._k = k;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && (this._point === 2 || this._point === 3))) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 2: this._point = 3; break;
      case 3: this._point = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

export default cardinalOpen;
