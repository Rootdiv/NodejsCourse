import { createReadStream, createWriteStream } from 'node:fs';
import { readdir } from 'node:fs/promises';

const findAndConcatTxt = async (path, resultFile) => {
  const wStream = createWriteStream(resultFile);
  try {
    const folderList = await readdir(path);
    folderList.forEach(file => {
      const ext = file.split('.').pop();
      if (/txt/i.test(ext)) {
        const rStream = createReadStream(`${path}/${file}`);
        rStream.on('data', chunk => {
          wStream.write(`[${file}]\n${chunk}\n\n`);
        });
      }
    });
  } catch (err) {
    console.error('Произошла ошибка', err);
  }
};

findAndConcatTxt('./files', './concat.txt');
