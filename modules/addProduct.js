import { readFile, writeFile } from 'fs/promises';
import { GOODS_FILE, INVALID_REQUEST_MESSAGE, SERVER_ERROR_MESSAGE } from './const.js';
import { getFormData } from './getFormData.js';
import { saveImage } from './saveImage.js';
import { formatNumData } from './formatNumData.js';

const SUCCESS_ADD_MESSAGE = 'Товар успешно добавлен';

export const addProduct = async (req, res) => {
  const data = JSON.parse(await getFormData(req));

  const fileData = await readFile(GOODS_FILE, 'utf8');
  const goods = JSON.parse(fileData);

  const id = Math.random().toString().substring(2, 5) + Date.now().toString().substring(9) + data.id;

  const { discount, price, count } = formatNumData(data);

  if (!price || !count) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    return;
  }

  const newProduct = {
    id,
    title: data.title,
    price,
    description: data.description,
    category: data.category,
    discount,
    count,
    units: data.units,
  };

  const dataImage = data.image.match(/^data:image\/([a-z+]+);base64,/i);
  const format = dataImage ? dataImage[1] : null;

  if (!format && !['png', 'svg+xml', 'jpeg'].includes(format)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    return;
  } else {
    try {
      newProduct.image = await saveImage(id, data.image, format);
    } catch (err) {
      console.error(`Ошибка при записи файла: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
      return;
    }
  }

  goods.push(newProduct);

  try {
    await writeFile(GOODS_FILE, JSON.stringify(goods), 'utf8');
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newProduct));
    console.log(SUCCESS_ADD_MESSAGE);
  } catch (err) {
    console.error(`Ошибка при записи файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
