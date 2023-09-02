#!/usr/bin/env node

import process from 'node:process';
import { argsParse } from './util/argsParse.js';
import { generatePassword } from './service/generatePassword.service.js';

const app = () => {
  //const args = argsParse(process.argv, ['learn', 'study', 'ready', 'go']);
  const args = argsParse(process.argv);

  const options = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (args.a || args.ask) {
    generatePassword(options);
    return;
  }

  if (args.h || args.help) {
    console.log(`
      -h --help      | список команд (игнор других команд)
      -l --length    | длинна пароля
      -u --uppercase | включить заглавные буквы
      -n --number    | включить числа
      -s --special   | включить спецсимволы
      -a --ask       | провести опрос (игнор других команд)
    `);
    return;
  }

  if (args.l || args.length) {
    console.log(`Длинна: ${args.l || args.length}`);
    options.length = args.l || args.length;
  }

  if (args.u || args.uppercase) {
    console.log('Прописные буквы');
    options.uppercase = args.u || args.uppercase;
  }

  if (args.n || args.number) {
    console.log('Цифры');
    options.number = args.n || args.number;
  }

  if (args.s || args.special) {
    console.log('Спецсимволы');
    options.special = args.s || args.special;
  }

  generatePassword(options);
};

app();
