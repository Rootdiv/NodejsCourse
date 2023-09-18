import { knex } from '../connect.js';
import { CRYPTO_DB, INVALID_REQUEST_MESSAGE, SERVER_ERROR_MESSAGE } from '../const.js';

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

    userTickers.forEach(async ticker => {
      if (validTickers.includes(ticker) && !tickers.includes(ticker)) {
        tickers.push(ticker);
        try {
          await knex(CRYPTO_DB).insert([{ ticker }]);
        } catch (err) {
          console.error(`Ошибка при записи в базу данных: ${err.message}`);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
        }
      }
    });

    if (tickers.length !== lengthTickers) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: SUCCESS_ADD_MESSAGE }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    }
  });
};
