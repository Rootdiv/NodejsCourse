import readline from 'node:readline/promises';
import process from 'node:process';
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const write = str => {
  process.stdout.write(str);
};

const findDir = await rl.question('Введите путь к директории: ');
const findStr = await rl.question('Введите строку для поиска: ');
const newStr = await rl.question('Введите строку для замены: ');

const findAndReplace = async sourceDir => {
  if (sourceDir.trim() === '' || sourceDir.trim() === '') {
    write('Не указана директория поиска\n');
    rl.close();
    return;
  } else if (sourceDir.startsWith(' ') || sourceDir.endsWith(' ')) {
    write('Директория поиска начинаются с пробела или закачиваются пробелом\n');
    rl.close();
    return;
  }
  try {
    const folderList = await readdir(sourceDir);
    folderList.forEach(async item => {
      const stats = await stat(`${sourceDir}/${item}`);
      if (stats.isFile() && path.extname(item) === '.txt') {
        const filePath = path.join(sourceDir, item);
        const fileTxt = await readFile(filePath, { encoding: 'utf-8' });
        const newFileTxt = fileTxt.replaceAll(findStr, newStr);
        await writeFile(filePath, newFileTxt);
      } else if (stats.isDirectory()) {
        findAndReplace(`${sourceDir}/${item}`);
      } else {
        write('Неизвестный тип файла');
        return;
      }
      rl.close();
    });
  } catch (error) {
    write(`Произошла ошибка: ${error}\n`);
    rl.close();
  }
};

findAndReplace(findDir);
