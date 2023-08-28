//?Stream
import { createWriteStream, createReadStream } from 'node:fs';

//!Writable
const wStream = createWriteStream('./write.txt');
wStream.on('pipe', () => {
  console.log('PIPE - подключение к readable стриму');
});

wStream.on('unpipe', () => {
  console.log('UNPIPE - отключение oт readable стрима');
});

wStream.on('finish', () => {
  console.log('FINISH - запись завершилась');
});

wStream.on('drain', () => {
  console.log('DRAIN - освободился буфер у writable');
});

wStream.on('drain ', () => {
  console.log('DRAIN - освободился буфер у writable');
});

wStream.on('error', err => {
  console.log('ERROR - ' + err);
});

wStream.on('close', () => {
  console.log('CLOSE - стрим закрыт');
});

// wStream.write('Записываем Данные\n');

// const buffer = Buffer.from('Буфер');

// wStream.write(buffer, 'utf-8', () => {
//   console.log('Данные записываются');
// });

//Закупорка данных
// wStream.cork();

// setTimeout(() => {
//   Раскупорка данных
//   wStream.uncork();
// }, 2000);

//wStream.end('\nЗакрываем стрим');

//wStream.write('Записываем Данные\n');

// wStream.destroy('Наша ошибка');

//wStream.setDefaultEncoding('utf-8');

//Количество закупоривания
console.log('writableCorked', wStream.writableCorked);
//Количество ошибок
console.log('errored', wStream.errored);
//Количество байтов (или объектов) в очереди, готовых к записи
console.log('writableLength', wStream.writableLength);
//Количество памяти до переполнения буфера
console.log('writableHighWaterMark', wStream.writableHighWaterMark);

//!Readable
const rStream = createReadStream('./files/read.txt');

const readStream = async path => {
  const stream = createReadStream(path);
  for await (const chunk of stream) {
    console.log('chunk: ', chunk);
  }
};

readStream('./files/read.txt');

//rStream.pipe(wStream);

//rStream.on('data', chunk => {
// console.log('-------data------');
// console.log(chunk);
// wStream.write(chunk);

//rStream.destroy('Ошибка');

// rStream.pause();

// console.log('Пауза 500 мс');

// setTimeout(() => {
//   console.log('Снимаю с паузы');
//   rStream.resume();
// }, 500);
//});
// rStream.on('readable', () => {
//   console.log('---------readable--------');
//   const buffer = rStream.read();
//   console.log(buffer);
//   if (buffer) {
//     wStream.write(buffer);
//   }
// });

rStream.on('end', () => {
  console.log('--------end-------');
  wStream.close();
});

rStream.on('pause', () => {
  console.log('--------pause-------');
});

rStream.on('resume', () => {
  console.log('--------resume-------');
});

rStream.on('error', err => {
  console.log('--------error-------');
  console.log(err);
  console.log('--------error-------');
});

rStream.on('close', () => {
  console.log('--------close-------');
});

//!Duplex
//!Transform
