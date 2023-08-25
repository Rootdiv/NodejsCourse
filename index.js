import { appendFile, stat } from 'node:fs/promises';

const checkFileStats = async path => {
  try {
    const stats = await stat(path);
    const statsPath = {
      'Файл или папка': path,
      'Размер файла в байтах': stats.size,
      'Дата создания файла': stats.birthtime,
      'Дата последнего изменения': stats.mtime,
    };

    if (stats.isFile()) {
      statsPath.type = 'Это файл';
    } else if (stats.isDirectory()) {
      statsPath.type = 'Это каталог';
    } else {
      statsPath.type = 'Это неизвестный тип';
    }
    console.log(statsPath);
  } catch (err) {
    console.error('Ошибка получения информации о файле', err);
  }
};

checkFileStats('./files');
checkFileStats('./files/newCopy.txt');

const appendToFile = async (filePath, data) => {
  try {
    await appendFile(filePath, data);
    console.log('Данные успешно записались в файл');
  } catch (err) {
    console.error('Ошибка при записи в файл', err);
  }
};

appendToFile('./files/newCopy.txt', `${new Date().toISOString()}: Допиши текст 2\n`);
appendToFile('./files/newCopy.txt', `${new Date().toISOString()}: Допиши текст 3\n`);
appendToFile('./files/newCopy.txt', `${new Date().toISOString()}: Допиши текст 4\n`);

setTimeout(() => {
  appendToFile('./files/newCopy.txt', `${new Date().toISOString()}: Допиши текст 5\n`);
}, 2000);

setTimeout(() => {
  appendToFile('./files/newCopy.txt', `${new Date().toISOString()}: Допиши текст 6\n`);
}, 5000);
