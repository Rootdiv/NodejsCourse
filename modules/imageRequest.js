import { readFile } from 'node:fs/promises';
import { SERVER_ERROR_MESSAGE } from './const.js';

export const imageRequest = async (req, res) => {
  try {
    let contentType = 'image/svg+xml';
    const [filename, ext] = req.url.split('.');
    if (ext === 'jpg' || ext === 'jpeg') {
      contentType = 'image/jpeg';
    } else if (ext === 'png') {
      contentType = 'image/png';
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    const image = await readFile(`.${filename}.${ext}`);
    res.end(image);
  } catch (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: SERVER_ERROR_MESSAGE }));
  }
};
