import { readFile } from 'node:fs/promises';

export const readData = async pathFile => {
  const data = await readFile(pathFile, 'utf-8');
  return JSON.parse(data);
};
