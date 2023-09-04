import { copyFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export const saveTodo = async () => {
  const fileNewPath = path.join(os.homedir(), 'todo.json');
  await copyFile('todo.json', fileNewPath);
  console.log(`Список задач скопирован по пути ${fileNewPath}`);
};
