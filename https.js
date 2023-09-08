import { readFileSync } from 'node:fs';
import { createServer } from 'node:https';

const option = {
  //Сертификаты сгенерированы локально.
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),
};

const server = createServer(option, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  res.end('Hello! This HTTP Server');
});

//В Linux для использования порта 443 требуется команда
//sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
server.listen(443, () => {
  console.log('Сервер запущен на https://localhost');
});
