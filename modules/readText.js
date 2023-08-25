import fs from 'node:fs/promises';

export const readText = async pathFile => {
  try {
    return await fs.readFile(pathFile, 'utf8');
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
  }
};
