import { knex } from './connect.js';
import { GOODS_DB, SERVER_ERROR_MESSAGE } from './const.js';

export const totalPriceRequest = async res => {
  try {
    const goodsData = await knex(GOODS_DB).column(['price', 'count']);
    const totalPriceGoods = goodsData.reduce((acc, { price, count }) => acc + price * count, 0);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(totalPriceGoods));
  } catch (err) {
    console.error(`Ошибка при получении информации товарах из базы данных: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
