let { pow, sqrt, cos, sin, atan2 } = Math;

// ComplexNumRectangular.js
let rectangular = {
  makeFromRealImag: (x, y) => ({
    x,
    y,
  }),
  makeFromMagAng: (r, a) => ({
    x: r * cos(a),
    y: r * sin(a),
  }),
  realPart: cnum => {
    console.log('rectangular realPart');
    return cnum.x;
  },
  imagePart: cnum => {
    console.log('rectangular imagePart');
    return cnum.y;
  },
  magnitude(cnum) {
    console.log('rectangular magnitude');
    return sqrt(pow(this.realPart(cnum), 2) + pow(this.imagePart(cnum), 2));
  },
  angle(cnum) {
    console.log('rectangular angle');
    return atan2(this.imagePart(cnum), this.realPart(cnum));
  },
};

// ComplexNumPolar.js
let polar = {
  makeFromRealImag: (x, y) => ({
    r: sqrt(pow(x, 2) + pow(y, 2)),
    a: atan2(y, x),
  }),
  makeFromMagAng: (r, a) => ({
    r,
    a,
  }),
  realPart(cnum) {
    console.log('polar realPart');
    return this.magnitude(cnum) * cos(angle(cnum));
  },
  imagePart(cnum) {
    console.log('polar imagePart');
    return this.magnitude(cnum) * sin(angle(cnum));
  },
  magnitude: cnum => {
    console.log('polar magnitude');
    return cnum.r;
  },
  angle: cnum => {
    console.log('polar angle');
    return cnum.a;
  },
};

// ComplexNum.js
// import rectangular from './ComplexNumRectangular';
// import polar from './ComplexNumPolar';
let table = {
  rectangular,
  polar,
};

let ComplexNum = {
  makeFromRealImag: (x, y) => ({
    ...table['rectangular']['makeFromRealImag'](x, y),
    complexNumType: 'rectangular',
  }),
  makeFromMagAng: (r, a) => ({
    ...table['polar']['makeFromMagAng'](r, a),
    complexNumType: 'polar',
  }),
  realPart: cnum => table[cnum.complexNumType]['realPart'](cnum),
  imagePart: cnum => table[cnum.complexNumType]['imagePart'](cnum),
  magnitude: cnum => table[cnum.complexNumType]['magnitude'](cnum),
  angle: cnum => table[cnum.complexNumType]['angle'](cnum),
  addComplex: (cnum1, cnum2) =>
    makeFromRealImag(realPart(cnum1) + realPart(cnum2), imagePart(cnum1) + imagePart(cnum2)),
  mulComplex: (cnum1, cnum2) =>
    makeFromMagAng(magnitude(cnum1) * magnitude(cnum2), angle(cnum1) + angle(cnum2)),
};

let {
  makeFromRealImag,
  makeFromMagAng,
  realPart,
  imagePart,
  magnitude,
  angle,
  addComplex,
  mulComplex,
} = ComplexNum;

// let cnum1 = makeFromRealImag(1, 2);
// let cnum2 = makeFromRealImag(1, 2);
// let cnum3 = makeFromMagAng(3, 3);
// let cnum4 = makeFromMagAng(3, 3);

// console.log(realPart(cnum1));
// console.log(angle(cnum3));
// console.log(addComplex(cnum1, cnum2));
// console.log(mulComplex(cnum3, cnum4));
// console.log(mulComplex(cnum1, cnum2));

// IntegerNum.js
let IntegerNum = {
  makeInteger: n => ({
    value: n,
  }),
  addInteger: (num1, num2) => makeInteger(num1.value + num2.value),
  mulInteger: (num1, num2) => makeInteger(num1.value * num2.value),
};

let { makeInteger, addInteger, mulInteger } = IntegerNum;

// let num1 = makeInteger(2);
// let num2 = makeInteger(5);

// console.log(num1);
// console.log(addInteger(num1, num2));
// console.log(mulInteger(num1, num2));

// GenericAriphmethics.js
// import { addComplex, mulComplex, makeFromRealImag } from './ComplexNum.js';
// import { addInteger, mulInteger, makeInteger } from './IntegerNum.js';
let GenArTable = {
  integer: {
    add: (num1, num2) => ({
      ...addInteger(num1, num2),
      numType: 'integer',
    }),
    mul: (num1, num2) => ({
      ...mulInteger(num1, num2),
      numType: 'integer',
    }),
  },
  complex: {
    add: (cnum1, cnum2) => ({
      ...addComplex(cnum1, cnum2),
      numType: 'complex',
    }),
    mul: (cnum1, cnum2) => ({
      ...mulComplex(cnum1, cnum2),
      numType: 'complex',
    }),
  },
};

let makeGInt = n => ({
  ...makeInteger(n),
  numType: 'integer',
});
let makeGFromRealImag = (x, y) => ({
  ...makeFromRealImag(x, y),
  numType: 'complex',
});
let add = (gnum1, gnum2) => GenArTable[gnum1.numType]['add'](gnum1, gnum2);
let mul = (gnum1, gnum2) => GenArTable[gnum1.numType]['mul'](gnum1, gnum2);

let gnum1 = makeGInt(2);
let gnum2 = makeGInt(7);
let gnum3 = makeGFromRealImag(1, 2);
let gnum4 = makeGFromRealImag(1, 2);
console.log(gnum1);
console.log(add(gnum1, gnum2));
console.log(gnum3);
console.log(add(gnum3, gnum4));
console.log(mul(gnum3, gnum4));
console.log(realPart(gnum3));
console.log(magnitude(gnum3));

/*
  Все контструкторы имеют различные имена. Т.е. во время создания num
  мы должны знать его тип и вручную вызывать соответсвующий make
  makeGInt(2)
  Если мы хотим иметь общий makeGNum(n), который сам разберется каким типом
  отметить num, то нам нужно обьявить функцию check (сделано в V2)

  Интересно то, что мы задекорировали все конструкторы
  (функции возвращающие тот же тип данных)
  и обьявили пару генерик методов - add, mul использующих метку конструкторов.
  Вот и все по сути.
*/

/*
  По поводу применения операций к аргументам разного типа - add(cnum, num)
  одна стратегия, написать в генериках наподобе add 
    if (type(n1) === type(n2)) add(n1, n2)
    else try coerce n1->n2
    else try coerce n2->n1
    можно еще попробовать найти общий тип t3 и привести к нему

  другая 
    if (type(n1) === type(n2)) add(n1, n2)
    else if (type(n1) === 'one' && type(n2) === 'another') {
      addOneAnother(n1, n2)
    } else if { ... }
    т.е. по сути явно написать несколько процедур работающих с аргументами
    разных типов.
*/
