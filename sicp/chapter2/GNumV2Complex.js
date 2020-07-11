const rectangular = require('./GNumV2Rectangular.js');
const polar = require('./GNumV2Polar.js');
const { makeConstructor } = require('./libGenerics.js');

const table = {
  rectangular,
  polar,
};

const makeFromRealImag = makeConstructor(table['rectangular']['makeFromRealImag'], {
  complexNumType: 'rectangular',
});

const makeFromMagAng = makeConstructor(table['polar']['makeFromMagAng'], {
  complexNumType: 'polar',
});

const realPart = cnum => table[cnum.complexNumType]['realPart'](cnum);

const imagePart = cnum => table[cnum.complexNumType]['imagePart'](cnum);

const magnitude = cnum => table[cnum.complexNumType]['magnitude'](cnum);

const angle = cnum => table[cnum.complexNumType]['angle'](cnum);

const addComplex = (cnum1, cnum2) =>
  makeFromRealImag(realPart(cnum1) + realPart(cnum2), imagePart(cnum1) + imagePart(cnum2));

const mulComplex = (cnum1, cnum2) =>
  makeFromMagAng(magnitude(cnum1) * magnitude(cnum2), angle(cnum1) + angle(cnum2));

module.exports = {
  makeFromRealImag,
  makeFromMagAng,
  realPart,
  imagePart,
  magnitude,
  angle,
  addComplex,
  mulComplex,
};
