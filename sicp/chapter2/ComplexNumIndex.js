import polar from './ComplexNumPolar';
import rectangular from './ComplexNumRectangular';

// table = {
//   rectangular: {
//     makeFromRealImag: f,
//     makeFromMagAng: f,
//     realPart: f,
//     imagePart: f,
//     magnitude: f,
//     angle: f,
//   },
//   polar: {
//     makeFromMagAng: f,
//     makeFromRealImag: f,
//     realPart: f,
//     imagePart: f,
//     magnitude: f,
//     angle: f,
//   },
// }

// getDispatch = (type, operation) => table[type][operation]
// getDispatch('rectangular', 'magnitude')
// magnitude = number => getDispatch(getType(number), 'magnitude')(getContent(number))

const numberTypes = {
  polar,
  rectangular,
};

// import { makeGenericGetter, getType, getContent } from 'lib'
const makeGenericGetter = (table, getterName) => number =>
  table[getType(number)][getterName](getContent(number));

export const methods = {
  makeFromRealImag: numberTypes['rectangular']['makeFromRealImag'],
  makeFromMagAng: numberTypes['polar']['makeFromMagAng'],
  realPart: makeGenericGetter(numberTypes, 'realPart'),
  imagePart: makeGenericGetter(numberTypes, 'imagePart'),
  magnitude: makeGenericGetter(numberTypes, 'magnitude'),
  angle: makeGenericGetter(numberTypes, 'angle'),
};

// usage
const makeFromRealImagRectangular = (x, y) => ({ x, y, type: 'rectangular' });
const makeFromRealImag = numberTypes['rectangular']['makeFromRealImag'];
const cnum = makeFromRealImag(1, 2);
realPart(cnum);

// alternative way - "message passing"
// v1
// по сути это makeRectangular. Т.е. тип - rectangular.
let makeFromRealImag = (x, y) => op => {
  if (op === 'realPart') {
    return x;
  } else if (op === 'imagePart') {
    return y;
  } else if (op === 'magnitude') {
    return Math.sqrt(x * x + y * y);
  } else if (op === 'angle') {
    return Math.atan(y, x);
  } else {
    return new Error(`${op} not supported`);
  }
};
let cnum = makeFromRealImag(1, 2);
cnum('realPart');

// v2
let table = {
  realPart: (x, y) => x,
  imagePart: (x, y) => y,
  magnitude: (x, y) => Math.sqrt(x * x + y * y),
  angle: (x, y) => Math.atan(y, x),
};

let makeFromRealImag = (x, y) => op => table[op](x, y);

let cnum = makeFromRealImag(1, 2);
cnum('realPart');

let realPart = cnum => cnum('realPart');
realPart(cnum);

// v3
let makeFromRealImag = (x, y) => ({
  realPart: () => x,
  imagePart: () => y,
  magnitude: () => Math.sqrt(x * x + y * y),
  angle: () => Math.atan(y, x),
});
let cnum = makeFromRealImag(1, 2);
cnum.realPart();

/*
  В "data driven"
  соответсвие между типом данных и функцией, работающей с этим типом
  ищется в динамике, т.е. во время вызова realPart(cnum). Поэтому
  нам нужно в конструкторе аттачить тип, чтобы потом по этому типу
  найти методы, работающие с этим типом.

  В "message passing"
  мы на этапе создания связываем тип и методы, поэтому искать ничего не надо.
  Также не нужно в конструкторе дополнительно аттачить тип. Минус в том, что
  если мы захотим диспатчить не только по одному типу 
  (rectangular/polar)
  cnum.realPart()
  но и по другому userRole = (admin/user)
  cnum.saveToDisk() // if admin doSome() else doAnother()
  то получится криво, т.к. нам придется добавить if в этом методе, а также в 
  polar версии. Т.е. нам придется 2 раза описать одну и ту же логику saveToDisk,
  так еще и if-ы добавить в него. Можно конечно вынести в одельную функцию
  saveToDisk(cnum)
  Которой без разницы тип (rectangular/polar), но ей важен тип (admin/user).
  Это избавит от дублирования логики, но if-ы останутся.
  Еще 1 вариант это не создавать 2 типа (rectangular/polar), а создать один (cnum),
  а в методах фигачить ифы по типам. Это снова избавит нас от дублирования
  логики в cnum.saveToDisk(). Правда какой толк от классов, если нет полиморфизма?

  Вывод: если данные могут иметь несколько типов, т.е. функции для работы
  с ними зависят от нескольких типов, то лучше не использовать "message passing"
*/
