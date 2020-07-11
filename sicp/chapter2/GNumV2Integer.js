const makeInteger = n => ({
  value: n,
});

const addInteger = (num1, num2) => makeInteger(num1.value + num2.value);
const mulInteger = (num1, num2) => makeInteger(num1.value * num2.value);
const isEqualInteger = (num1, num2) => num1.value === num2.value;
const isZeroInteger = num => num.value === 0;

module.exports = {
  makeInteger,
  addInteger,
  mulInteger,
  isEqualInteger,
  isZeroInteger,
};
