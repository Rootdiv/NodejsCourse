import { readFile } from 'node:fs/promises';
import { GOODS_FILE, SERVER_ERROR_MESSAGE } from './const.js';

const pagination = (data, page, count) => {
  const end = count * page;
  const start = page === 1 ? 0 : end - count;
  const totalCount = data.length;

  const pages = Math.ceil(data.length / count);

  return {
    goods: data.slice(start, end),
    page,
    pages,
    totalCount,
  };
};

export const goodsRequest = async (res, query) => {
  try {
    const fileData = await readFile(GOODS_FILE, 'utf8');
    const goods = JSON.parse(fileData);
    const page = +query.page || 1;
    const paginationCount = +query.count || 10;
    const goodsData = pagination(goods, page, paginationCount);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(goodsData));
  } catch (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
