import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

const copy = async (from, to) => {
  try {
    await pipeline(
      createReadStream(from),
      // любые стримы, например упаковка или распаковка
      createWriteStream(to),
    );
    console.log('ready');
  } catch (err) {
    console.error(err);
  }
};

copy('./files/ShamanKing.mp3', './files/test.mp3');
