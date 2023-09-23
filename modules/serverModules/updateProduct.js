import { knex } from '../connect.js';
import { unlink } from 'fs/promises';
import { GOODS_DB, INVALID_REQUEST_MESSAGE, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from '../const.js';
import { getFormData } from '../dataModules/getFormData.js';
import { saveImage } from '../dataModules/saveImage.js';
import { formatNumData } from '../dataModules/formatNumData.js';

export const updateProduct = async (req, res, id) => {
  if (id === '0') return;
  const data = JSON.parse(await getFormData(req));

  const updateProduct = {};

  const { discount, price, count } = formatNumData(data);

  if (!price || !count) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    return;
  }

  const [product] = await knex(GOODS_DB).where({ id });
  if (!product) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: NOT_FOUND_MESSAGE }));
    return;
  }

  updateProduct.title = data.title;
  updateProduct.price = price;
  updateProduct.description = data.description;
  updateProduct.category = data.category;
  updateProduct.discount = discount;
  updateProduct.count = count;
  updateProduct.units = data.units;

  //Удаляем свойства обновлённого объекта значения которых совпадают с исходным
  for (const key in product) {
    if (product[key] === data[key]) {
      delete updateProduct[key];
    }
  }

  if (data.image) {
    const format = data.image.match(/^data:image\/([a-z+]+);base64,/i)[1];
    if (!['png', 'svg+xml', 'jpeg'].includes(format)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
      return;
    } else {
      try {
        updateProduct.image = await saveImage(id, data.image, format);
      } catch (err) {
        console.error(`Ошибка при записи файла: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
        return;
      }
    }
  }

  //Удаляем старый файл если новый в другом формате
  if (updateProduct.image && product.image !== updateProduct.image) {
    await unlink(product.image);
  }

  try {
    await knex(GOODS_DB).where({ id }).update(updateProduct);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end();
  } catch (err) {
    console.error(`Ошибка при записи обновлении товара: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
