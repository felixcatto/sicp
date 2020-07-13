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

const makeComplex = (n1, n2, complexNumType) =>
  complexNumType === 'rectangular' ? makeFromRealImag(n1, n2) : makeFromMagAng(n1, n2);

const realPart = cnum => table[cnum.complexNumType]['realPart'](cnum);

const imagePart = cnum => table[cnum.complexNumType]['imagePart'](cnum);

const magnitude = cnum => table[cnum.complexNumType]['magnitude'](cnum);

const angle = cnum => table[cnum.complexNumType]['angle'](cnum);

const addComplex = (cnum1, cnum2) =>
  makeFromRealImag(realPart(cnum1) + realPart(cnum2), imagePart(cnum1) + imagePart(cnum2));

const mulComplex = (cnum1, cnum2) =>
  makeFromMagAng(magnitude(cnum1) * magnitude(cnum2), angle(cnum1) + angle(cnum2));

const isEqualComplex = (cnum1, cnum2) => table[cnum1.complexNumType]['isEqual'](cnum1, cnum2);

const isZeroComplex = cnum => table[cnum.complexNumType]['isZero'](cnum);

module.exports = {
  makeComplex,
  realPart,
  imagePart,
  magnitude,
  angle,
  addComplex,
  mulComplex,
  isEqualComplex,
  isZeroComplex,
};
