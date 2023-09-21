import { readFile } from 'node:fs/promises';
import { GOODS_FILE, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from './const.js';
import { pagination } from './pagination.js';

export const categoryGoodsRequest = async (url, res, query) => {
  try {
    const fileData = await readFile(GOODS_FILE, 'utf8');
    const goodsData = JSON.parse(fileData);
    const categoryName = decodeURIComponent(url.split('/').pop());
    const goodsCategory = goodsData.filter(({ category }) => category === categoryName);
    const page = +query.page || 1;
    const paginationCount = 10;
    if (goodsCategory.length) {
      const goodsData = pagination(goodsCategory, page, paginationCount);
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
