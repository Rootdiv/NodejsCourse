import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { parse } from 'node:path';

export const decompress = async inputFilePath => {
  const extname = inputFilePath.split('.').pop();
  if (!inputFilePath.length || extname !== 'gz') {
    console.log('Не указано имя файла или не тот файл');
    return;
  }

  try {
    const fileName = parse(inputFilePath).name;
    const newExtName = fileName.split('_').pop();
    const newFileName = fileName.substring(fileName.lastIndexOf('_'), -fileName.length);
    const dirPath = parse(inputFilePath).dir;

    const dirName = dirPath === '.' ? '' : `${dirPath}/`;
    const outputFilePath = `${dirName}${newFileName}.${newExtName}`;

    const input = createReadStream(inputFilePath);
    const output = createWriteStream(outputFilePath);

    input.pipe(createGunzip()).pipe(output);

    const inputHashFilePath = `${dirName}${inputFilePath.slice(0, -3)}.sha256`;
    const inputHash = await readFile(inputHashFilePath);
    const data = await readFile(outputFilePath);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    console.log('hash: ', hash);
    console.log('inputHash: ', inputHash.toString('utf8'));
    console.log(inputHash.toString() === hash);

    console.log(`Данные успешно распакованы, файл находится по пути ${outputFilePath}`);
  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
};
