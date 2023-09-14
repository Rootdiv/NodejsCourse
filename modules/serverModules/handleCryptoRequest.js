import { readFile } from 'node:fs/promises';
import { QUOTES_FILE, SERVER_ERROR_MESSAGE } from '../const.js';
import { handleQueryStep } from './handleQueryStep.js';

export const handleCryptoRequest = async (res, query) => {
  try {
    const fileData = await readFile(QUOTES_FILE, 'utf8');
    const quotesData = JSON.parse(fileData);
    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (query.tickers) {
      const tickers = query.tickers.toUpperCase().split(',');
      const filteredData = {};

      tickers.forEach(ticker => {
        if (Object.prototype.hasOwnProperty.call(quotesData, ticker)) {
          filteredData[ticker] = quotesData[ticker];
        }
      });
      return handleQueryStep(res, filteredData, query.step);
    }

    handleQueryStep(res, quotesData, query.step);
  } catch (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
