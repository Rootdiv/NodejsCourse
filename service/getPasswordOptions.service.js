import readline from 'node:readline/promises';
import process from 'node:process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const write = str => {
  process.stdout.write(str);
};

// const clear = () => {
//   write('\x1BC');
// };
//Корректная очистка консоли Ubuntu Mate
const clear = () => {
  write('printf \x1bc');
};

export const getPasswordOptions = async () => {
  clear();
  const options = {};
  const length = await rl.question('Длинна пароля: ');
  if (isNaN(+length) || +length < 8) {
    write('Минимальная длинна пароля 8 символов\n');
    getPasswordOptions();
  } else {
    options.length = length;
  }

  write('Для включения опций нужно ответить Д(а) или Y(es)\n');
  const uppercase = await rl.question('Включить заглавные буквы? ');
  if (
    uppercase.toLowerCase() === 'y' ||
    uppercase.toLowerCase() === 'yes' ||
    uppercase.toLowerCase() === 'д' ||
    uppercase.toLowerCase() === 'да'
  ) {
    options.uppercase = true;
  } else {
    options.uppercase = false;
  }

  const number = await rl.question('Включить цифры? ');
  if (
    number.toLowerCase() === 'y' ||
    uppercase.toLowerCase() === 'yes' ||
    number.toLowerCase() === 'д' ||
    uppercase.toLowerCase() === 'да'
  ) {
    options.number = true;
  } else {
    options.number = false;
  }

  const special = await rl.question('Включить спецсимволы? ');
  if (
    special.toLowerCase() === 'y' ||
    uppercase.toLowerCase() === 'yes' ||
    special.toLowerCase() === 'д' ||
    uppercase.toLowerCase() === 'да'
  ) {
    options.special = true;
  } else {
    options.special = false;
  }

  rl.close();
  return options;
};
