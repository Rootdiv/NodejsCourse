import { readFile, writeFile } from 'node:fs/promises';
import { QUOTES_FILE } from '../const.js';

const MAX_QUOTES = process.env.MAX_QUOTES;

export const storeQuotesData = async data => {
  try {
    const fileData = await readFile(QUOTES_FILE, 'utf8');
    const quotesData = JSON.parse(fileData);
    for (const currency in data) {
      if (Object.hasOwnProperty.call(data, currency)) {
        if (!Object.hasOwnProperty.call(quotesData, currency)) {
          quotesData[currency] = [];
        }
        quotesData[currency].push(data[currency]);
      }
    }

    for (const currency in quotesData) {
      if (Object.hasOwnProperty.call(quotesData, currency)) {
        if (quotesData[currency].length > MAX_QUOTES) {
          quotesData[currency].shift();
        }
      }
    }

    try {
      await writeFile(QUOTES_FILE, JSON.stringify(quotesData));
    } catch (err) {
      console.error(`Ошибка при записи данных в файл: ${err.message}`);
    }
  } catch (err) {
    console.error(`Ошибка при чтении данных из файла: ${err.message}`);
  }
};
