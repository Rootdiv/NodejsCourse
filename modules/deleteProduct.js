import { readFile, unlink, writeFile } from 'node:fs/promises';
import { GOODS_FILE, NOT_FOUND_MESSAGE, SERVER_ERROR_MESSAGE } from './const.js';

export const deleteProduct = async (productId, res) => {
  if (productId === '0') return;
  try {
    const fileData = await readFile(GOODS_FILE, 'utf8');
    const goods = JSON.parse(fileData);
    const index = goods.findIndex(product => product.id === productId);
    if (index === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: NOT_FOUND_MESSAGE }));
      return;
    }
    const [removedItem] = goods.splice(index, 1);
    await unlink(removedItem.image);
    try {
      await writeFile(GOODS_FILE, JSON.stringify(goods), 'utf8');
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    } catch (err) {
      console.error(`Ошибка при записи файла: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
    }
  } catch (err) {
    console.error(`Ошибка при чтении файла: ${err}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
