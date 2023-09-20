import { readFile } from 'node:fs/promises';
import { GOODS_FILE, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from './const.js';

export const productRequest = async (url, res) => {
  try {
    const fileData = await readFile(GOODS_FILE, 'utf8');
    const goodsData = JSON.parse(fileData);
    const productId = url.split('/').pop();
    const product = goodsData.find(({ id }) => id === productId);
    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: NOT_FOUND_MESSAGE }));
    }
  } catch (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
