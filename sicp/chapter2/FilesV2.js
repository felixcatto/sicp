// generics.js
let keyBy = (array, key) =>
  array.reduce(
    (acc, el) => ({
      ...acc,
      [el[key]]: el,
    }),
    {}
  );

let makeTable = (type, types) => {
  const hasCheck = types.every(typeInfo => typeof typeInfo.check === 'function');
  return {
    hasCheck,
    type,
    types: keyBy(types, type),
  };
};

let makeGenericGetter = (table, getterName) => (taggedEntity, ...params) =>
  table.types[taggedEntity[table.type]][getterName](taggedEntity, ...params);

let makeGenericConstructor = tables => entity => {
  const tags = tables
    .filter(table => table.hasCheck)
    .reduce(
      (acc, table) => ({
        ...acc,
        [table.type]: Object.keys(table.types).find(type => table.types[type].check(entity)),
      }),
      {}
    );

  return { ...entity, ...tags };
};

let makeGenericMethods = (constructorName, tables) => {
  const getters = tables
    .flatMap(table => {
      const [type] = Object.keys(table.types);
      return Object.keys(table.types[type])
        .filter(getterName => getterName !== 'check' && getterName !== table.type)
        .map(getterName => ({ getterName, table }));
    })
    .reduce(
      (acc, { getterName, table }) => ({
        ...acc,
        [getterName]: makeGenericGetter(table, getterName),
      }),
      {}
    );

  return {
    [constructorName]: makeGenericConstructor(tables),
    ...getters,
  };
};

// index.js
let fileTypes = makeTable('fileType', [
  {
    fileType: 'binary',
    download: file => console.log('download binary'),
    write: file => console.log('write binary'),
    check: file => ['.jpg', '.jpeg', '.png', '.gif'].find(ext => file.name.endsWith(ext)),
  },
  {
    fileType: 'text',
    download: file => console.log('download text'),
    write: (file, folder) => console.log(`download text to ${folder}`),
    check: file => ['.txt', '.html'].find(ext => file.name.endsWith(ext)),
  },
]);

// мы не используем здесь `check`, т.к. на момент создания файла,
// в конструкторе мы руками указываем роль юзера, вместо провекри по чеку
let userRoles = makeTable('role', [
  {
    role: 'admin',
    sendToEmail: () => console.log('sendToEmail admin'),
  },
  {
    role: 'common',
    sendToEmail: () => console.log('sendToEmail common'),
  },
]);

let { makeFile, write, download, sendToEmail } = makeGenericMethods('makeFile', [fileTypes, userRoles]);

write(makeFile({ name: 'vasa.txt' }), 'root');
download(makeFile({ name: 'vasa.jpg' }));
sendToEmail(makeFile({ name: 'vasa.jpg', role: 'admin' }));
sendToEmail(makeFile({ name: 'vasa.jpg', role: 'common' }));
sendToEmail({ role: 'common' });
/*
  TODO: разобраться с конструкторами, которые возвращают файл encode(file)
    и с их автоматическим созданием. Они должны помечать файл типом. 
    Возможно что некоторые конструкторы могут даже менять тип файла
    encode(file) -> binary
    text(file) -> text

    Все контструкторы имеют различные имена. Т.е. во время создания num
    мы должны знать его тип и вручную вызывать соответсвующий make
    makeRational(num)
      т.е. в нашем случае во время создания file - вручную прописывать роль 
      { role: 'common' }
    Если мы хотим иметь общий makeNum(n), который сам разберется каким типом
    отметить num, то нам нужно обьявить функцию check
      у нас есть makeFile(), который так и работает. Если бы check не было, то
      makeFile() просто ничего не сделает

    Так что походу все ок, не считая encode(file) -> binary


  TODO: кросс методы зависящие от двух таблиц
*/