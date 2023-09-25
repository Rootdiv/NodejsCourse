import { knex } from '../connect.js';
import { GOODS_DB, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from '../const.js';

export const categoriesRequest = async res => {
  try {
    //Получаем из базы массив объектов с уникальными значениями и преобразуем его в массив значений
    const categories = await knex(GOODS_DB).distinct('category').pluck('category');
    if (categories.length) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(categories));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: NOT_FOUND_MESSAGE }));
    }
  } catch (err) {
    console.error(`Ошибка при получении категорий: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
