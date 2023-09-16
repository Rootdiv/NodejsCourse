import { knex } from '../connect.js';
import { CRYPTO_DB } from '../const.js';

const MAX_QUOTES = process.env.MAX_QUOTES;

export const storeQuotesData = async data => {
  try {
    const quotesData = {};
    const cryptoDB = await knex(CRYPTO_DB).column('ticker', 'quotes');
    cryptoDB.forEach(item => {
      quotesData[item.ticker] = JSON.parse(item.quotes);
    });
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
    for (const currency in quotesData) {
      try {
        await knex(CRYPTO_DB)
          .where({ ticker: currency })
          .update({ quotes: JSON.stringify(quotesData[currency]) });
      } catch (err) {
        console.error(`Ошибка при записи в базу данных: ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`Ошибка при чтении из базы данных: ${err.message}`);
  }
};
