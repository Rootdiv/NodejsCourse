import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { parse } from 'node:path';

export const compress = async inputFilePath => {
  if (!inputFilePath.length) {
    console.log('Не указано имя файла');
    return;
  }

  try {
    const data = await readFile(inputFilePath);
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    const extname = parse(inputFilePath).ext.slice(1);
    const fileName = parse(inputFilePath).name;
    const dirPath = parse(inputFilePath).dir;

    const dirName = dirPath === '' ? './' : `${dirPath}/`;
    const outputFilePath = `${dirName}${fileName}_${extname}.gz`;
    const outputHashFilePath = `${dirName}${fileName}_${extname}.sha256`;

    const outputHash = createWriteStream(outputHashFilePath);
    outputHash.write(hash);

    const input = createReadStream(inputFilePath);
    const output = createWriteStream(outputFilePath);

    input.pipe(createGzip()).pipe(output);

    console.log(`Данные успешно упакованы, файл находится по пути ${outputFilePath}`);
    console.log(`Контрольная сумма исходного файла находится по пути ${outputHashFilePath}`);
  } catch (err) {
    console.error('Произошла ошибка:', err);
  }
};
