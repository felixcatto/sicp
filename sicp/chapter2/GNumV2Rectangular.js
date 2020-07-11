const { pow, sqrt, cos, sin, atan2 } = Math;

const makeFromRealImag = (x, y) => ({
  x,
  y,
});

const makeFromMagAng = (r, a) => ({
  x: r * cos(a),
  y: r * sin(a),
});

const realPart = cnum => {
  console.log('rectangular realPart');
  return cnum.x;
};

const imagePart = cnum => {
  console.log('rectangular imagePart');
  return cnum.y;
};

const magnitude = cnum => {
  console.log('rectangular magnitude');
  return sqrt(pow(realPart(cnum), 2) + pow(imagePart(cnum), 2));
};

const angle = cnum => {
  console.log('rectangular angle');
  return atan2(imagePart(cnum), realPart(cnum));
};

module.exports = {
  makeFromRealImag,
  makeFromMagAng,
  realPart,
  imagePart,
  magnitude,
  angle,
};
