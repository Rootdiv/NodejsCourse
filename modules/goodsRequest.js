import { readFile } from 'node:fs/promises';
import { GOODS_FILE, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from './const.js';
import { pagination } from './pagination.js';

export const goodsRequest = async (res, query) => {
  try {
    const fileData = await readFile(GOODS_FILE, 'utf8');
    const goods = JSON.parse(fileData);
    const page = +query.page || 1;
    const paginationCount = +query.count || 10;
    if (goods.length) {
      const goodsData = pagination(goods, page, paginationCount);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(goodsData));
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
