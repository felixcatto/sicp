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
makeGenericGetter = (table, getterName) => number => table[getType(number)][getterName](getContent(number));

export const methods = {
  makeFromRealImag: numberTypes['rectangular']['makeFromRealImag'],
  makeFromMagAng: numberTypes['polar']['makeFromMagAng'],
  realPart: makeGenericGetter(numberTypes, 'realPart'),
  imagePart: makeGenericGetter(numberTypes, 'imagePart'),
  magnitude: makeGenericGetter(numberTypes, 'magnitude'),
  angle: makeGenericGetter(numberTypes, 'angle'),
};
