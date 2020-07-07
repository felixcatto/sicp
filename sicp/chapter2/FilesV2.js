// generics.js
let keyBy = (array, key) => array.reduce((acc, el) => ({
  ...acc,
  [el[key]]: el
}), {})

let makeTable = (type, types) => {
  const hasCheck = types.every(typeInfo => typeof typeInfo.check === "function");
  return {
    hasCheck,
    type,
    types: keyBy(types, type),
  }
}

let makeGenericGetter = (table, getterName) => taggedEntity =>
  table.types[taggedEntity[table.type]][getterName](taggedEntity);

let makeGenericConstructor = tables => entity => {
  const tags = tables
    .filter((table) => table.hasCheck)
    .reduce((acc, table) => ({
      ...acc,
      [table.type]: Object.keys(table.types).find((type) => table.types[type].check(entity)),
    }), {});

  return { ...entity, ...tags };
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
    write: file => console.log('write text'),
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

let result = {
  makeFile: makeGenericConstructor([fileTypes, userRoles]),
  write: makeGenericGetter(fileTypes, 'write'),
  download: makeGenericGetter(fileTypes, 'download'),
  sendToEmail: makeGenericGetter(userRoles, 'sendToEmail'),
}

// TODO: забиндить методы и данные, чтобы можно было вызывать file.write()
result.write(result.makeFile({ name: 'vasa.txt' }))
result.download(result.makeFile({ name: 'vasa.jpg' }))
result.sendToEmail(result.makeFile({ name: 'vasa.jpg', role: 'admin' }))
result.sendToEmail(result.makeFile({ name: 'vasa.jpg', role: 'common' }))
