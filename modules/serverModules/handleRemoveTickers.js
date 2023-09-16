import { knex } from '../connect.js';
import { CRYPTO_DB, INVALID_REQUEST_MESSAGE, SERVER_ERROR_MESSAGE } from '../const.js';

const SUCCESS_DELETE_MESSAGE = 'Валюта успешно удалена';

export const handleRemoveTickers = async (res, tickers, query) => {
  try {
    const tickersLength = tickers.length;

    if (!query.tickers) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
      return;
    }

    const quotesData = {};
    const removeTickers = query.tickers.toUpperCase().split(',');
    const [cryptoDB] = await knex(CRYPTO_DB).column('ticker', 'quotes');
    quotesData[cryptoDB.ticker] = JSON.parse(cryptoDB.quotes);

    removeTickers.forEach(async ticker => {
      const index = tickers.indexOf(ticker);
      if (index !== -1) {
        tickers.splice(index, 1);
        delete quotesData[ticker];
        await knex(CRYPTO_DB).where({ ticker }).del();
      }
    });

    if (tickers.length !== tickersLength) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: SUCCESS_DELETE_MESSAGE }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    }
  } catch (err) {
    console.error(`Ошибка при удалении из базы данных: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
