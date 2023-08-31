import readline from 'node:readline/promises';
import process from 'node:process';
import { readFile } from 'node:fs/promises';

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

const pos = (row, col) => {
  write(`\x1b[${row};${col}H`);
};

const box = (row, col, height, width) => {
  const border = ['┌', '─', '┐', '│', '└', '┘'];
  const w = width - 2;
  const h = height - 2;
  pos(row, col);
  write(border[0] + border[1].repeat(w) + border[2]);
  for (let i = 1; i < h; i++) {
    pos(row + i, col);
    write(border[3] + ' '.repeat(w) + border[3]);
  }
  pos(row + h, col);
  write(border[4] + border[1].repeat(w) + border[5]);
};

let questionCount = 0;
let answerCount = 0;
const answerIndex = [];

const data = await readFile('./question.json');
const questions = JSON.parse(data.toString('utf-8'));

const showProgress = () => {
  clear();
  box(1, 0, 7, 26);
  pos(2, 3);
  write(`\x1b[34mВопросов: ${questionCount} из ${questions.length}\x1b[0m`);
  box(3, 3, 4, 22);
  let i = 0;
  for (i; i < questionCount; i++) {
    if (answerIndex.includes(i)) {
      pos(4, 5 + i);
      write('\x1b[42m \x1b[0m');
    } else {
      pos(4, 5 + i);
      write('\x1b[41m \x1b[0m');
    }
  }

  for (let j = i + 1; j <= questions.length; j++) {
    pos(4, 5 + j);
    write(' ');
  }
  pos(7, 0);
};

const endQuiz = answerCount => {
  showProgress();
  write('\nОпрос закончен.\n');
  write(`Вы правильно ответили на ${answerCount} вопросов\n`);
  rl.close();
};

const quiz = async () => {
  showProgress();
  const question = questions[questionCount];
  write(`\n\x1b[32m${question.question}\x1b[0m`);

  const options = question.options;
  for (let i = 0; i <= options.length; i++) {
    write(`\n${i + 1}: ${options[i]}`);
  }

  const answer = await rl.question('\n\x1b[34mВаш ответ: \x1b[0m');

  if (+answer === 0) {
    endQuiz(answerCount);
    return;
  }
  if (isNaN(+answer) || +answer < 0 || +answer > options.length) {
    write('\x1b[31mОтвет некорректный! Попробуйте еще раз.\x1b[0m\n');
    quiz(question);
  } else {
    questionCount++;
    if (+answer === question.correctIndex + 1) {
      answerIndex.push(questionCount - 1);
      answerCount++;
      quiz(question);
    } else {
      quiz(question);
    }
  }
  if (questionCount >= questions.length) {
    endQuiz(answerCount);
    return;
  }
};

clear();
write(`Ответьте на ${questions.length} вопросов по Node.js и JavaScript,`);
write('\nдля выбора варианта ответа введите его номер.\n');
write('Нажмите Enter, чтобы начать');

rl.once('line', () => {
  quiz();
});

rl.on('close', () => {
  process.exit();
});
