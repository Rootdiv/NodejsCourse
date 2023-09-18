import { access, writeFile, mkdir } from 'node:fs/promises';
import { createServer } from 'node:http';

const PORT = process.env.PORT || 3000;

const upload = async (req, res, base64, format) => {
  const folderName = './images';

  try {
    await access(folderName);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdir(folderName);
      console.log(`Папка ${folderName} создана`);
    } else {
      console.error(`Нет доступа к папке ${folderName}`);
      console.error('err:', err);
      res.statusCode = 500;
      res.end('Произошла ошибка при сохранении файла');
      return;
    }
  }

  const ext = format === 'svg+xml' ? 'svg' : format === 'jpeg' ? 'jpg' : format;

  const base64Image = base64.split(';base64,')[1];
  const fileName = `image_${Date.now()}.${ext}`;
  const pathFile = `${folderName}/${fileName}`;

  await writeFile(pathFile, base64Image, {
    encoding: 'base64',
  });

  console.log(`Изображение сохранено: ${pathFile}`);
  res.end(`Изображение сохранено: ${pathFile}`);
};

const server = createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
  });

  if (req.method === 'POST' && req.url === '/upload') {
    try {
      let data = '';

      req.on('data', chunk => {
        data += chunk;
      });

      req.on('end', () => {
        const { base64Data } = JSON.parse(data);
        const format = base64Data.match(/^data:image\/([a-z+]+);base64,/i)[1];

        if (['png', 'svg+xml', 'jpeg'].includes(format)) {
          upload(req, res, base64Data, format);
        }
      });
    } catch (err) {
      console.log('err:', err);
      res.statusCode = 500;
      res.end('Произошла ошибка при сохранении файла');
    }
  } else {
    res.statusCode = 404;
    res.end('Метод или url запроса не верный');
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
