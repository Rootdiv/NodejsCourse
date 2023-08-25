import fs from 'node:fs/promises';

export const write = async (pathFile, data) => {
  try {
    await fs.writeFile(pathFile, data, 'utf8');
    return true;
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
  }
};
