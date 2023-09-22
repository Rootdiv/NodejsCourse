import { readFile, unlink, writeFile } from 'fs/promises';
import { GOODS_FILE, INVALID_REQUEST_MESSAGE, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from './const.js';
import { getFormData } from './getFormData.js';
import { saveImage } from './saveImage.js';
import { formatNumData } from './formatNumData.js';

const SUCCESS_UPDATED_MESSAGE = 'Товар успешно обновлён';

export const updateProduct = async (req, res, productId) => {
  const data = JSON.parse(await getFormData(req));

  const fileData = await readFile(GOODS_FILE, 'utf8');
  const goods = JSON.parse(fileData);

  const updateProduct = {};

  const { discount, price, count } = formatNumData(data);

  if (!price || !count) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    return;
  }

  const index = goods.findIndex(product => product.id === productId);
  if (index === -1) {
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
  for (const key in goods[index]) {
    if (goods[index][key] === data[key]) {
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
        updateProduct.image = await saveImage(productId, data.image, format);
      } catch (err) {
        console.error(`Ошибка при записи файла: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
        return;
      }
    }
  }

  //Удаляем старый файл если новый в другом формате
  if (updateProduct.image && goods[index].image !== updateProduct.image) {
    await unlink(goods[index].image);
  }

  goods[index] = { ...goods[index], ...updateProduct };

  try {
    await writeFile(GOODS_FILE, JSON.stringify(goods), 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SUCCESS_UPDATED_MESSAGE }));
  } catch (err) {
    console.error(`Ошибка при записи файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
