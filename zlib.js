import { createReadStream } from 'node:fs';
import { access, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPublic = 'public';

const getContentType = filePath => {
  const extname = path.extname(filePath);

  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.png':
      return 'image/png';
    case '.svg':
      return 'image/svg+xml';
    case '.woff2':
      return 'font/woff2';
    default:
      return 'application/octet-stream';
  }
};

createServer(async (req, res) => {
  const filePath = path.join(__dirname, dirPublic, req.url);
  console.log('filePath: ', filePath);

  try {
    await access(filePath);
    const fileStat = await stat(filePath);
    const fileStream = createReadStream(filePath);
    const acceptEncoding = req.headers['accept-encoding'];
    const contentType = getContentType(filePath);

    if (acceptEncoding && acceptEncoding.includes('gzip')) {
      res.writeHead(200, { 'Content-Type': contentType, 'Content-Encoding': 'gzip' });
      fileStream.pipe(createGzip()).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': fileStat.size });
      fileStream.pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Ошибка сервера');
  }
}).listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
