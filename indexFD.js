import { createServer } from 'node:http';
import multer from 'multer';

const PORT = process.env.PORT || 3000;

const folderName = './images';

const storage = multer.diskStorage({
  destination: folderName,
  filename(req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const filename = `image_${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const server = createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
  });

  if (req.method === 'POST' && req.url === '/upload') {
    try {
      const uploadSingle = upload.single('file');

      uploadSingle(req, res, err => {
        if (err instanceof multer.MulterError) {
          res.statusCode = 400;
          res.end('Ошибка при обработке файла');
          return;
        }

        if (err) {
          throw new Error();
        }

        const filename = req.file.filename;
        const pathFile = `${folderName}/${filename}`;
        console.log(`Изображение сохранено: ${pathFile}`);
        res.end(`Изображение сохранено: ${pathFile}`);
      });
    } catch (error) {
      console.log('error:', error);
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
