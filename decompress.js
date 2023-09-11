import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';

const inputFilePath = 'lorem.gz';
const outputFilePath = 'lorem.txt';

const input = createReadStream(inputFilePath);
const output = createWriteStream(outputFilePath);

input.pipe(createGunzip()).pipe(output);

console.log('Данные успешно распакованы');
