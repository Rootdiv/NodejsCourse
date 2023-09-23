export const SERVER_ERROR_MESSAGE = 'Внутренняя ошибка сервера';
export const INVALID_REQUEST_MESSAGE = 'Неверный запрос';
export const NOT_FOUND_MESSAGE = 'Товар не найден';
export const GOODS_FILE = process.env.GOODS_FILE;
export const GOODS_DB = process.env.GOODS_DB;
export const NOT_FOUND_GOODS = {
  goods: [
    {
      id: '0',
      title: 'Ошибка загрузки товаров',
      description: '',
      price: 0,
      category: '',
      discount: 0,
      count: 0,
      units: '',
    },
  ],
  page: 1,
  pages: 1,
  totalCount: 0,
};
export const NOT_FOUND_DATA = {
  goods: [
    {
      id: '0',
      title: 'По Вашему запросу ничего не найдено',
      description: '',
      price: 0,
      category: '',
      discount: 0,
      count: 0,
      units: '',
    },
  ],
  page: 1,
  pages: 1,
  totalCount: 0,
};
