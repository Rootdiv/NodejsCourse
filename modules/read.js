import fs from 'node:fs/promises';

export const read = async pathFile => {
  try {
    return await fs.readFile(pathFile);
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
  }
};
