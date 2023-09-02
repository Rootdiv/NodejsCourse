import { readFile } from 'node:fs/promises';

export const readTodo = async pathFile => {
  try {
    return await readFile(pathFile, 'utf-8');
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
  }
};
