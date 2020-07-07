// binaryFile.js
const binaryFiles = ['.jpg', '.jpeg', '.png', '.gif'];
export {
  type: 'binary',
  download: file => axios.get(file, 'binary')
  write: file => writeBinary(file),
  check: file => binaryFiles.find(ext => file.endsWith(ext)),
};

// textFile.js
const textFiles = ['.txt', '.html'];
export {
  type: 'text',
  download: file => axios.get(file, 'text', 'utf-8')
  write: file => writeText(file),
  check: file => textFiles.find(ext => file.endsWith(ext)),
};

// filesIndex.js
import binaryFile from 'binaryFile';
import textFile from 'textFile';
const fileTypes = {
  binaryFile,
  textFile,
};
/*
const fileTypes = [
  binaryFile,
  textFile,
];
  норм если мы биндим дату с методами на этапе создания entity
  и вызываем `file.write()`, но мы хотим дефолтный воркфлоу `write(file)`
  поэтому лучше обектом намутить, а не массивом. А то в геттерах
  тож придется .find писать вместо fileTypes[type]
*/

const makeGenericGetter = (table, getterName) => markedEntity =>
  table[markedEntity.type][getterName](markedEntity);

const makeGenericConstructor = table => entity => {
  const type = Object.keys(table).find((type) => table[type].check(entity));
  return { ...entity, type };
};

export {
  makeFile: makeGenericConstructor(fileTypes),
  write: makeGenericGetter(fileTypes, 'write'),
  download: makeGenericGetter(fileTypes, 'download'),
  sendToEmail: makeGenericGetter(userRoles, 'sendToEmail'),
  // userRoles = [common, admin]
  // if admin => no restrictions
  // if common => allow to send once per day
  // TODO
}

`
  Интересно то, что мы теперь можем писать 
  write(file), вместо
  writeBinary(file)
  writeText(file)
  и то же самое с download.
  Хотя конечно мы могли просто ифчик засунуть во write и получить то же самое.

  Также мы можем динамически диспатчить по нескольким филдам
  write: makeGenericGetter(fileTypes, 'write')
  write(someFile)
    диспатчит write в зависимости от типа файла text/binary
  
  sendToEmail: makeGenericGetter(userRoles, 'sendToEmail'),
  sendToEmail(someFile, email)
    диспатчит sendToEmail в зависимости от роли юзера.

  Разумеется всегда можно просто написать ифчик в sendToEmail
  Проблема возникает, когда
    типов > 2
    геттеров > 2

  Я конечно переживаю насчет бойлерплейта, но ведь можно и не создавать
  отдельные файлы `binaryFile.js`, `adminRole.js`, а прям тут описывать
  const fileTypes = {
    binaryFile: {
      write: () => {...}
    },
    textFile: {
      write: () => {...}
    },
  };

  const userRoles = {
    admin: {
      sendToEmail: () => {...}
    },
    common: {
      sendToEmail: () => {...}
    }
  }

  Вывод: По сути динамик диспатч не очень то и нужен. По началу
  можно вполне обойтись абстракцией на уровне функций.
  
  const makeFile = (file) => {
    let type;
    if (binaryFiles.includes(file.ext)) {
      type = 'binary'
    } else {
      type = 'text'
    }
    return { file, type }
  }
  
  const write = (file) => {
    if (file.type === 'text') {
      makeSome()
    } else if (file.type === 'binary') {
      makeAnother()
    }
  }

  а когда ухудшится читаемость (*), перейти на динамик диспатч
    * увеличится число типов binary/text/.../newType
    * увеличится число геттеров/функций зависящих от типа `write()`
    * увеличится сложность функций `makeSome()`
`