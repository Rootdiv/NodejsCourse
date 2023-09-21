import { access, mkdir, readFile, writeFile } from 'fs/promises';
import { GOODS_FILE, INVALID_REQUEST_MESSAGE, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from './const.js';

const SUCCESS_UPDATED_MESSAGE = 'Товар успешно обновлён';

const upload = async (id, base64, format) => {
  const folderName = 'image';

  try {
    await access(folderName);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdir(folderName);
      console.log(`Папка ${folderName} создана`);
    }
  }

  const ext = format === 'svg+xml' ? 'svg' : format === 'jpeg' ? 'jpg' : format;

  const base64Image = base64.split(';base64,')[1];
  const fileName = `${id}.${ext}`;
  const pathFile = `${folderName}/${fileName}`;

  await writeFile(pathFile, base64Image, {
    encoding: 'base64',
  });

  return pathFile;
};

const formData = req =>
  new Promise(resolve => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
  });

export const updateProduct = async (req, res, productId) => {
  const data = JSON.parse(await formData(req));

  const fileData = await readFile(GOODS_FILE, 'utf8');
  const goods = JSON.parse(fileData);

  const discount = parseInt(data.discount) >= 0 ? parseInt(data.discount) : null;
  const price = parseFloat(data.price) > 0 ? parseFloat(data.price) : null;
  const count = parseInt(data.count) > 0 ? parseInt(data.count) : null;
  const dataImage = data.image && data.image.match(/^data:image\/([a-z+]+);base64,/i);
  const format = dataImage ? dataImage[1] : null;
  console.log(data);
  if (discount !== null || !price || !count || (!format && !['png', 'svg+xml', 'jpeg'].includes(format))) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: INVALID_REQUEST_MESSAGE }));
    return;
  }

  let image = '';

  try {
    image = await upload(productId, data.image, format);
  } catch (err) {
    console.error(`Ошибка при записи файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }

  const newProduct = {
    title: data.title,
    price,
    description: data.description,
    category: data.category,
    discount,
    count,
    units: data.units,
    image,
  };

  const index = goods.findIndex(product => product.id === productId);
  if (index === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: NOT_FOUND_MESSAGE }));
    return;
  }

  //goods[index] = { ...goods[index], ...newProduct };

  // try {
  //   await writeFile(GOODS_FILE, JSON.stringify(goods), 'utf8');
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify({ message: SUCCESS_UPDATED_MESSAGE }));
  // } catch (err) {
  //   console.error(`Ошибка при записи файла: ${err.message}`);
  //   res.writeHead(500, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  // }
};
