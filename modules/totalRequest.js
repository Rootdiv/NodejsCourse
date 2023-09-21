import { readFile } from 'node:fs/promises';
import { GOODS_FILE, SERVER_ERROR_MESSAGE } from './const.js';

export const totalPriceRequest = async res => {
  try {
    const fileData = await readFile(GOODS_FILE, 'utf8');
    const goodsData = JSON.parse(fileData);
    const totalPriceGoods = goodsData.reduce((acc, { price, count }) => acc + parseFloat(price) * count, 0);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(totalPriceGoods));
  } catch (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
