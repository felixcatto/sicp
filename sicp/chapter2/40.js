// Using flatMap in js

makeInterval = (a, b) => {
  if (b < a) return [];
  const iter = (acc, i) => (i === b ? acc.concat(i) : iter(acc.concat(i), i + 1));
  return iter([], a);
};

isPrime = n => makeInterval(2, Math.ceil(Math.sqrt(n))).every(el => n % el !== 0);

makePrimeSumPairs = n =>
  makeInterval(1, n).flatMap(i =>
    makeInterval(1, i - 1)
      .filter(j => isPrime(i + j))
      .map(j => [i, j, i + j])
  );

makePrimeSumPairs = n => {
  const sumPairs = [];
  for (i = 1; i <= n; i++) {
    for (j = 1; j < i; j++) {
      if (isPrime(i + j)) {
        sumPairs.push([i, j, i + j]);
      }
    }
  }
  return sumPairs;
};

(() => makeInterval(0, 2).flatMap(el => makeInterval(0, 1).map(i => el + i)))();

// 1 ≤ j < i ≤ n
uniquePairs = n => makeInterval(1, n).flatMap(i => makeInterval(1, i - 1).map(j => [i, j]));

makePrimeSumPairs = n => uniquePairs(n).filter(([i, j]) => isPrime(i + j));

iflatMap = list =>
  list.reduce(
    (acc, el) => (Array.isArray(el) ? el.reduce((iacc, iel) => iacc.concat(iel), acc) : acc.concat(el)),
    []
  );
iflatMap([1, 2, 3]);
iflatMap([1, [2, 3, 4], 5]);

makeUser({
  name: 'fedya',
  class: 'swordmaster',
});

makeUser('vasya', 'royal guard');

makeUser = (nameOrObject, class) => {
  if (isObject(nameOrObject)) {
    const object = nameOrObject;
    return object
  }
  const name = nameOrObject;
  return {
    name,
    class,
  }
}

// Dependency Injection

let bark = msg => console.log(msg);
bark('wow');

// no_di.js
let makeDog = () => ({
  bark: msg => {
    const printer = makeConsolePrinter();
    // const printer = makeFilePrinter();
    printer.print(msg);
  },
});

let makeConsolePrinter = () => ({
  print: msg => console.log(msg),
});

let dog = makeDog();
dog.bark('wow');

// di.js
let makeDog = printer => ({
  bark: msg => {
    printer.print(msg);
  },
});

let makeConsolePrinter = () => ({
  print: msg => console.log(msg),
});

let dog = makeDog(makeConsolePrinter());
dog.bark('wow');

// ts.js
/*
let IOutput = {
  print: (msg:string) => string | void,
};
*/

let makeDog = (printer: IOutput) => ({
  bark: msg => {
    printer.print(msg);
  },
});

let makeConsolePrinter /* implements IOutput */ = () => ({
  print: msg => console.log(msg),
});

let makeDogService = () => ({
  createDog: () => {
    const printer = makeConsolePrinter();
    const dog = makeDog(printer);
    dog.bark('wow ts');
  },
});

let dogService = makeDogService();
dogService.createDog();
