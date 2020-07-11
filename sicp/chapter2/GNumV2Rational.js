const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const makeRational = (numer, denom) => {
  const g = gcd(numer, denom);
  const n = numer / g;
  const d = denom / g;
  return { n, d };
};

const numer = rnum => rnum.n;
const denom = rnum => rnum.d;

const addRational = (rnum1, rnum2) => {
  const n = numer(rnum1) * denom(rnum2) + numer(rnum2) * denom(rnum1);
  const d = denom(rnum1) * denom(rnum2);
  return makeRational(n, d);
};

const mulRational = (rnum1, rnum2) => {
  const n = numer(rnum1) * numer(rnum2);
  const d = denom(rnum1) * denom(rnum2);
  return makeRational(n, d);
};

const isEqualRational = (rnum1, rnum2) => numer(rnum1) === numer(rnum2) && denom(rnum1) === denom(rnum2);

const isZeroRational = rnum => numer(rnum) === 0;

module.exports = {
  makeRational,
  addRational,
  mulRational,
  isEqualRational,
  isZeroRational,
};
