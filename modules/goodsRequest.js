import { readFile } from 'node:fs/promises';
import { GOODS_FILE, NOT_FOUND_DATA, NOT_FOUND_GOODS, SERVER_ERROR_MESSAGE } from './const.js';
import { pagination } from './pagination.js';

export const goodsRequest = async (res, query) => {
  try {
    const fileData = await readFile(GOODS_FILE, 'utf8');
    const goodsDB = JSON.parse(fileData);
    let goodsData = goodsDB;
    const page = +query.page || 1;
    const paginationCount = +query.count || 10;
    if (query.search) {
      const search = query.search.trim().toLowerCase();
      goodsData = goodsDB.filter(
        item => item.title.toLowerCase().includes(search) || item.category.toLowerCase().includes(search),
      );
    }
    if (goodsData.length) {
      const goods = pagination(goodsData, page, paginationCount);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(goods));
    } else if (!goodsData.length && query.search) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(NOT_FOUND_DATA));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(NOT_FOUND_GOODS));
    }
  } catch (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
