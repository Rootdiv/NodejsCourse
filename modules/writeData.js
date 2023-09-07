import { writeFile } from 'node:fs/promises';

export const writeData = async (res, pathFile, data, code) => {
  await writeFile(pathFile, JSON.stringify(data), 'utf-8');
  res.statusCode = code;
};
