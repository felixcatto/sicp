const { makeInteger, addInteger, mulInteger } = require('./GNumV2Integer.js');
const { makeRational, addRational, mulRational } = require('./GNumV2Rational.js');
const {
  makeFromRealImag,
  makeFromMagAng,
  realPart,
  imagePart,
  magnitude,
  angle,
  addComplex,
  mulComplex,
} = require('./GNumV2Complex.js');
const { makeConstructor } = require('./libGenerics.js');

let GenArTable = {
  integer: {
    make: ([n]) => ({
      ...makeInteger(n),
      numType: 'integer',
    }),
    check: args => args.length === 1,
    add: makeConstructor(addInteger, { numType: 'integer' }),
    mul: makeConstructor(mulInteger, { numType: 'integer' }),
  },
  rational: {
    make: ([n, d]) => ({
      ...makeRational(n, d),
      numType: 'rational',
    }),
    check: args => args.length === 2,
    add: makeConstructor(addRational, { numType: 'rational' }),
    mul: makeConstructor(mulRational, { numType: 'rational' }),
  },
  complex: {
    make: ([n1, n2, complexNumType]) => {
      const make = complexNumType === 'rectangular' ? makeFromRealImag : makeFromMagAng;
      return {
        ...make(n1, n2),
        numType: 'complex',
      };
    },
    check: args => args.length === 3,
    add: makeConstructor(addComplex, { numType: 'complex' }),
    mul: makeConstructor(mulComplex, { numType: 'complex' }),
  },
};

let makeGNum = (...args) => {
  const numType = Object.keys(GenArTable).find(numType => GenArTable[numType].check(args));
  return GenArTable[numType]['make'](args);
};
let add = (gnum1, gnum2) => GenArTable[gnum1.numType]['add'](gnum1, gnum2);
let mul = (gnum1, gnum2) => GenArTable[gnum1.numType]['mul'](gnum1, gnum2);

let gnum5 = makeGNum(322);
let gnum6 = makeGNum(1, 2, 'rectangular');
let gnum7 = makeGNum(1, 2, 'polar');
let gnum8 = makeGNum(1, 2, 'rectangular');
let gnum1 = makeGNum(1, 2);
let gnum2 = makeGNum(1, 2);
console.log(gnum5);
console.log(gnum6);
console.log(gnum7);
// console.log(mul(gnum6, gnum8));
console.log(gnum1);
console.log(add(gnum1, gnum2));
console.log(mul(gnum1, gnum2));
