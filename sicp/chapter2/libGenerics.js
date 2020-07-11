const makeConstructor = (constructor, type) => (...args) => ({
  ...constructor(...args),
  ...type,
});

module.exports = {
  makeConstructor,
};
