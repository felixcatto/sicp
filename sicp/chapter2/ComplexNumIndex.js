import polar from './ComplexNumPolar';
import rectangular from './ComplexNumRectangular';

// table = {
//   rectangular: {
//     realPart: f,
//     imagePart: f,
//     magnitude: f,
//     angle: f,
//   },
//   polar: {
//     realPart: f,
//     imagePart: f,
//     magnitude: f,
//     angle: f,
//   },
// }

// dispatch = (type, operation) => table[type][operation]
// dispatch('rectangular', 'magnitude')

// magnitude = number => dispatch(getType(number), 'magnitude')(getContent(number))

const numberTypes = {
  polar,
  rectangular,
}

// import { makeGenericGetter, getType, getContent } from 'lib'
// we can user `(...args)` instead of `number`. Just need to change getType
makeGenericGetter = (table, getterName) => number =>
  table[getType(number)][getterName](getContent(number));

export {
  realPart: makeGenericGetter(numberTypes, 'realPart'),
  imagePart: makeGenericGetter(numberTypes, 'imagePart'),
  magnitude: makeGenericGetter(numberTypes, 'magnitude'),
  angle: makeGenericGetter(numberTypes, 'angle'),
};
