import 'dotenv/config';
import { fetchValidTickers } from './modules/fetchValidTickers.js';
import { fetchAndStoreData } from './modules/fetchAndStoreData.js';
import { startServer } from './modules/startServer.js';
import { knex } from './modules/connect.js';
import { CRYPTO_DB } from './modules/const.js';

const PORT = process.env.PORT || 3000;

try {
  const validTickers = await fetchValidTickers();

  //Соединения с БД должно оставаться открытым для нормальной работы приложения
  const tickers = await knex(CRYPTO_DB).pluck('ticker');

  const server = startServer(tickers, validTickers);
  server.listen(PORT, 'localhost', () => {
    if (process.env.PROD !== 'true') {
      console.log(`Сервер запущен на порте ${PORT}`);
    }
  });

  setInterval(() => {
    fetchAndStoreData(tickers);
  }, 30000);
} catch (err) {
  console.error(`Ошибка при чтении из базы данных: ${err.message}`);
}
