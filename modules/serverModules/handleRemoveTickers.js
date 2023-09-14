import { readFile, writeFile } from 'node:fs/promises';
import { INVALID_REQUEST_MESSAGE, QUOTES_FILE, SERVER_ERROR_MESSAGE, TICKERS_FILE } from '../const.js';

const SUCCESS_DELETE_MESSAGE = 'Валюта успешно удалена';

export const handleRemoveTickers = async (res, tickers, query) => {
  try {
    const tickersLength = tickers.length;

    if (!query.tickers) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
      return;
    }

    const removeTickers = query.tickers.toUpperCase().split(',');
    const fileData = await readFile(QUOTES_FILE, 'utf8');
    const quotesData = JSON.parse(fileData);

    removeTickers.forEach(ticker => {
      const index = tickers.indexOf(ticker);
      if (index !== -1) {
        tickers.splice(index, 1);
        delete quotesData[ticker];
      }
    });

    if (tickers.length !== tickersLength) {
      await writeFile(TICKERS_FILE, JSON.stringify(tickers), 'utf8');
      await writeFile(QUOTES_FILE, JSON.stringify(quotesData), 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: SUCCESS_DELETE_MESSAGE }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    }
  } catch (err) {
    console.error(`Ошибка при удалении данных: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
