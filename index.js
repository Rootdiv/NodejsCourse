#!/usr/bin/env node

import process from 'node:process';
import { argsParse } from './util/argsParse.js';
import { compress } from './modules/compress.js';
import { decompress } from './modules/decompress.js';

const app = () => {
  const args = argsParse(process.argv);

  if (args.h || args.help) {
    console.log(`
      -h --help         | список команд
      -с <fileName>     | имя файла для архивации
      -d <arcFileName>  | имя архивного файла для разархивации
    `);
    return;
  }

  if (args.c) {
    compress(args.c);
    return;
  }

  if (args.d) {
    decompress(args.d);
    return;
  }

  console.log('Не указаны обязательные аргументы, выполните команду node index -h для вывода доступных команд');
};

app();
