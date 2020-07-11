const makeInteger = n => ({
  value: n,
});

const addInteger = (num1, num2) => makeInteger(num1.value + num2.value);
const mulInteger = (num1, num2) => makeInteger(num1.value * num2.value);

module.exports = {
  makeInteger,
  addInteger,
  mulInteger,
};
