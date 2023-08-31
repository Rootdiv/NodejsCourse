import readline from 'node:readline/promises';
import process from 'node:process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '# ',
});

//const answer = await rl.question('Hello, your name: ');
console.log('Write command or help: ');

const commands = {
  help() {
    console.log('help', 'time', 'date', 'exit');
  },
  time() {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    console.log(`${hours}:${minutes}:${seconds}`);
  },
  date() {
    const currentData = new Date();
    //const dateStr = currentData.toISOString().split('T')[0];
    const day = String(currentData.getDate()).padStart(2, '0');
    const month = String(currentData.getMonth()).padStart(2, '0');
    const year = currentData.getFullYear();
    console.log(`${day}.${month}.${year}`);
  },
  exit() {
    rl.close();
  },
};

rl.on('line', line => {
  const command = commands[line];
  if (command) {
    command();
  } else {
    console.log('Не верная команда');
  }
  rl.prompt();
});

rl.on('close', () => {
  console.log('See you');
  process.exit();
});
