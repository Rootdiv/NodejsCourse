import { knex } from '../connect.js';
import { CRYPTO_DB, SERVER_ERROR_MESSAGE } from '../const.js';
import { handleQueryStep } from './handleQueryStep.js';

export const handleCryptoRequest = async (res, query) => {
  try {
    const quotesData = {};
    const cryptoDB = await knex(CRYPTO_DB).column('ticker', 'quotes');
    cryptoDB.forEach(item => {
      quotesData[item.ticker] = JSON.parse(item.quotes);
    });
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
    console.error(`Ошибка при чтении из базы данных: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
