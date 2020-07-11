const { pow, sqrt, cos, sin, atan2 } = Math;

const makeFromRealImag = (x, y) => ({
  x,
  y,
});

const makeFromMagAng = (r, a) => ({
  x: r * cos(a),
  y: r * sin(a),
});

const realPart = cnum => cnum.x;

const imagePart = cnum => cnum.y;

const magnitude = cnum => sqrt(pow(realPart(cnum), 2) + pow(imagePart(cnum), 2));

const angle = cnum => atan2(imagePart(cnum), realPart(cnum));

const isEqual = (cnum1, cnum2) =>
  realPart(cnum1) === realPart(cnum2) && imagePart(cnum1) === imagePart(cnum2);

const isZero = cnum => realPart(cnum) === 0;

module.exports = {
  makeFromRealImag,
  makeFromMagAng,
  realPart,
  imagePart,
  magnitude,
  angle,
  isEqual,
  isZero,
};
