import { readdir, mkdir, copyFile, unlink, rm, access, watch } from 'node:fs/promises';

import { readText } from './modules/readText.js';
import { write } from './modules/write.js';

const app = async () => {
  try {
    const text = await readText('./files/text.txt');
    console.log('text: ', text);
    await write('./files/resultAsync.txt', text.toUpperCase());
    console.log('Файл создан');
  } catch (err) {
    console.log('error: ', err);
  }
};

const app2 = async () => {
  try {
    readdir('./files')
      .then(async files => {
        await mkdir('./newFolder', { recursive: true });
        console.log('Папка создана');
        return files;
      })
      .then(files => {
        files.forEach(async file => {
          await copyFile(`./files/${file}`, `./newFolder/${file}`);
          console.log(file, 'файл скопирован');

          setTimeout(async () => {
            await unlink(`./newFolder/${file}`);
            console.log(file, 'был удалён');
          }, 3000);
          // setTimeout(async () => {
          //   await rm(`./newFolder/${file}`);
          //   console.log(file, 'был удалён');
          // }, 3000);
        });
        setTimeout(async () => {
          await rm('./newFolder', { recursive: true });
          console.log('Папка удалёна');
        }, 3000);
        setTimeout(async () => {
          access('./newFolder')
            .then(() => {
              rm('./newFolder', { recursive: true });
            })
            .then(() => {
              console.log('Папка удалёна');
            })
            .catch(() => {
              console.error('Папки нет');
            });
        }, 5000);
      });
  } catch (err) {
    console.error(err);
  }
};

const watcherStart = async path => {
  try {
    let date = 0;
    const changes = [];
    const watcher = watch(path);

    for await (const { eventType, filename } of watcher) {
      if (Date.now() - date > 100) {
        date = Date.now();
        changes.push({ date, eventType, filename });
        console.log('\x1Bc');
        changes.forEach(({ date, eventType, filename }) => {
          console.log(`${new Date(date).toISOString()}: ${eventType} - ${filename}`);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

watcherStart('./files');

console.log('App start');
// app();
// app2();
