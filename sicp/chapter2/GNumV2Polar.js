let { pow, sqrt, cos, sin, atan2 } = Math;

const makeFromRealImag = (x, y) => ({
  r: sqrt(pow(x, 2) + pow(y, 2)),
  a: atan2(y, x),
});

const makeFromMagAng = (r, a) => ({
  r,
  a,
});

const realPart = cnum => magnitude(cnum) * cos(angle(cnum));

const imagePart = cnum => magnitude(cnum) * sin(angle(cnum));

const magnitude = cnum => cnum.r;

const angle = cnum => cnum.a;

const isEqual = (cnum1, cnum2) => magnitude(cnum1) === magnitude(cnum2) && angle(cnum1) === angle(cnum2);

const isZero = cnum => angle(cnum) === 0;

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
