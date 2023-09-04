#!/usr/bin/env node

import process from 'node:process';
import { argsParse } from './util/argsParse.js';
import { generatePassword } from './service/generatePassword.service.js';
import { getPasswordOptions } from './service/getPasswordOptions.service.js';
import { writePass } from './util/writePass.util.js';
import { getSetting, saveSetting } from './service/setting.service.js';

const app = async () => {
  const args = argsParse(process.argv, ['ask', 'setting']);

  const options = {
    length: 8,
    uppercase: false,
    number: false,
    special: false,
  };

  if (!args.setting) {
    const setting = await getSetting();
    Object.assign(options, setting);
  }

  if (args.a || args.ask) {
    console.log('Ответьте на вопросы:');
    const options = await getPasswordOptions();
    const password = generatePassword(options);
    writePass(password);
  }

  if (args.h || args.help) {
    console.log(`
      -h --help      | список команд (игнор других команд)
      -l --length    | длинна пароля
      -u --uppercase | включить заглавные буквы
      -n --number    | включить числа
      -s --special   | включить спецсимволы
      ask -a         | провести опрос (игнор других команд)
      setting        | сохраняет пароль из парамеров -l -u -n -s
    `);
    process.exit();
  }

  if (args.l || args.length) {
    options.length = +(args.l || args.length);
  }

  if (args.u || args.uppercase) {
    options.uppercase = args.u || args.uppercase;
  }

  if (args.n || args.number) {
    options.number = args.n || args.number;
  }

  if (args.s || args.special) {
    options.special = args.s || args.special;
  }

  if (args.setting) {
    await saveSetting(options);
    process.exit();
  }

  const password = generatePassword(options);
  writePass(password);
};

app();
