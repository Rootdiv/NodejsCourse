import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

const inputFilePath = 'lorem.txt';
const outputFilePath = 'lorem.gz';

const input = createReadStream(inputFilePath);
const output = createWriteStream(outputFilePath);

input.pipe(createGzip()).pipe(output);

console.log('Данные успешно упакованы');
