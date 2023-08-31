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

let questionCount = 0;
let answerCount = 0;

const data = await readFile('./question.json');
const questions = JSON.parse(data.toString('utf-8'));

const endQuiz = answerCount => {
  write('\nОпрос закончен.\n');
  write(`Вы правильно ответили на ${answerCount} вопросов\n`);
  rl.close();
};

const quiz = async () => {
  const question = questions[questionCount];
  write(`\n${question.question}`);

  const options = question.options;
  for (let i = 0; i <= options.length; i++) {
    write(`\n${i + 1}. ${options[i]}`);
  }

  const answer = await rl.question('Ваш ответ: ');

  if (+answer === 0) {
    endQuiz(answerCount);
    return;
  }
  if (isNaN(+answer) || +answer < 0 || +answer > options.length) {
    write('Ответ некорректный! Попробуйте еще раз.\n');
    quiz(question);
  } else {
    questionCount++;
    if (+answer === question.correctIndex + 1) {
      write('Правильный ответ!\n');
      answerCount++;
      quiz(question);
    } else {
      write('Неправильный ответ.\n');
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
