import { writeFile } from 'node:fs/promises';
import { INVALID_REQUEST_MESSAGE, SERVER_ERROR_MESSAGE, TICKERS_FILE } from '../const.js';

const SUCCESS_ADD_MESSAGE = 'Валюта успешно добавлена';

export const handleAddTickers = (req, res, tickers, validTickers) => {
  const lengthTickers = tickers.length;

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    const userTickers = [];
    const data = JSON.parse(body.toUpperCase());

    if (typeof data === 'string') {
      userTickers.push(data);
    }

    if (Array.isArray(data)) {
      userTickers.push(...data);
    }

    userTickers.forEach(ticker => {
      if (validTickers.includes(ticker) && !tickers.includes(ticker)) {
        tickers.push(ticker);
      }
    });

    if (tickers.length !== lengthTickers) {
      try {
        await writeFile(TICKERS_FILE, JSON.stringify(tickers), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: SUCCESS_ADD_MESSAGE }));
      } catch (err) {
        console.error(`Ошибка при записи файла: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    }
  });
};
