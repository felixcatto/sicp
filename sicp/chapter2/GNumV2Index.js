const { makeInteger, addInteger, mulInteger, isEqualInteger, isZeroInteger } = require('./GNumV2Integer.js');
const {
  makeRational,
  addRational,
  mulRational,
  isEqualRational,
  isZeroRational,
} = require('./GNumV2Rational.js');
const { makeComplex, addComplex, mulComplex, isEqualComplex, isZeroComplex } = require('./GNumV2Complex.js');
const { makeConstructor } = require('./libGenerics.js');
const { strict: assert } = require('assert');

let GenArTable = {
  integer: {
    make: ([n]) => ({
      ...makeInteger(n),
      numType: 'integer',
    }),
    check: args => args.length === 1,
    add: makeConstructor(addInteger, { numType: 'integer' }),
    mul: makeConstructor(mulInteger, { numType: 'integer' }),
    isEqual: isEqualInteger,
    isZero: isZeroInteger,
  },
  rational: {
    make: ([n, d]) => ({
      ...makeRational(n, d),
      numType: 'rational',
    }),
    check: args => args.length === 2,
    add: makeConstructor(addRational, { numType: 'rational' }),
    mul: makeConstructor(mulRational, { numType: 'rational' }),
    isEqual: isEqualRational,
    isZero: isZeroRational,
  },
  complex: {
    make: ([n1, n2, complexNumType]) => ({
      ...makeComplex(n1, n2, complexNumType),
      numType: 'complex',
    }),
    check: args => args.length === 3,
    add: makeConstructor(addComplex, { numType: 'complex' }),
    mul: makeConstructor(mulComplex, { numType: 'complex' }),
    isEqual: isEqualComplex,
    isZero: isZeroComplex,
  },
};

let makeGNum = (...args) => {
  const numType = Object.keys(GenArTable).find(numType => GenArTable[numType].check(args));
  return GenArTable[numType]['make'](args);
};
let add = (gnum1, gnum2) => GenArTable[gnum1.numType]['add'](gnum1, gnum2);
let mul = (gnum1, gnum2) => GenArTable[gnum1.numType]['mul'](gnum1, gnum2);
let isEqual = (gnum1, gnum2) => GenArTable[gnum1.numType]['isEqual'](gnum1, gnum2);
let isZero = gnum => GenArTable[gnum.numType]['isZero'](gnum);

let gnum5 = makeGNum(322);
let gnum6 = makeGNum(1, 2, 'rectangular');
let gnum7 = makeGNum(1, 2, 'polar');
let gnum8 = makeGNum(1, 2, 'rectangular');
let gnum1 = makeGNum(1, 2);
let gnum2 = makeGNum(1, 2);
console.log(gnum5);
console.log(gnum6);
console.log(gnum7);
console.log(mul(gnum6, gnum8));
console.log(gnum1);
console.log(add(gnum1, gnum2));
console.log(mul(gnum1, gnum2));

assert.ok(isEqual(gnum6, gnum8));
assert.ok(isEqual(gnum7, gnum7));
assert.ok(!isEqual(makeGNum(1), makeGNum(2)));
assert.ok(isEqual(makeGNum(1, 2), makeGNum(1, 2)));
assert.ok(isZero(makeGNum(0)));
assert.ok(!isZero(makeGNum(322)));
assert.ok(!isZero(makeGNum(1, 2)));
assert.ok(isZero(makeGNum(0, 2)));
assert.ok(isZero(makeGNum(0, 2, 'rectangular')));
assert.ok(!isZero(makeGNum(0, 2, 'polar')));
assert.ok(isZero(makeGNum(1, 0, 'polar')));
