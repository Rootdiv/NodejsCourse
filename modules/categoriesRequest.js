import { readFile } from 'node:fs/promises';
import { GOODS_FILE, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from './const.js';

export const categoriesRequest = async res => {
  try {
    const fileData = await readFile(GOODS_FILE, 'utf8');
    const goodsData = JSON.parse(fileData);
    const categories = goodsData.map(item => item.category);
    if (categories.length) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(categories));
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
