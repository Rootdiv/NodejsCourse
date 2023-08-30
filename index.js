import process from 'node:process';

const write = str => process.stdout.write(str);

const read = cb => {
  process.stdin.on('data', chunk => {
    cb(chunk.toString('utf-8'));
  });
};

//const clear = () => write('\x1BC');
//Корректная очистка консоли Ubuntu Mate
const clear = () => write('printf \x1bc');

const pos = (row, col) => write(`\x1b[${row};${col}H`);

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

clear();

box(4, 4, 4, 30);

pos(5, 5);

write('Имя: ');

read(str => {
  write(`\nПривет, ${str.trim()}!\n`);
  process.exit();
});
