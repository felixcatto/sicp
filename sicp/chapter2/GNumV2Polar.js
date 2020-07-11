let { pow, sqrt, cos, sin, atan2 } = Math;

const makeFromRealImag = (x, y) => ({
  r: sqrt(pow(x, 2) + pow(y, 2)),
  a: atan2(y, x),
});

const makeFromMagAng = (r, a) => ({
  r,
  a,
});

const realPart = cnum => {
  console.log('polar realPart');
  return magnitude(cnum) * cos(angle(cnum));
};

const imagePart = cnum => {
  console.log('polar imagePart');
  return magnitude(cnum) * sin(angle(cnum));
};

const magnitude = cnum => {
  console.log('polar magnitude');
  return cnum.r;
};

const angle = cnum => {
  console.log('polar angle');
  return cnum.a;
};

module.exports = {
  makeFromRealImag,
  makeFromMagAng,
  realPart,
  imagePart,
  magnitude,
  angle,
};
