import http from 'node:http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  //res.statusCode = 302;
  res.setHeader('Content-Language', 'ru');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  //res.setHeader('Content-Length', Buffer.byteLength(data));
  // res.setHeader('Cache-Control', 'no-cache');
  // res.setHeader('Cache-Control', 'no-store');
  // res.setHeader('Cache-Control', 'private');
  // res.setHeader('Cache-Control', 'max-age=60');
  // res.setHeader('Cache-Control', 's-maxage=60');

  res.setHeader('User-Agent', 'MethedApp/1.0');
  //res.setHeader('Location', 'https://rootdiv.ru');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Set-Cookie', ['sessionId=12345; Max-Age=3600; Secure; SameSite=None', 'userId=789; SameSite=Strict']);

  const cookies = req.headers.cookie;
  console.log('Куки:', cookies);

  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Сервер запущен на http://localhost');
});

const options = {
  hostname: 'jsonplaceholder.typicode.com',
  path: '/users/1',
  prot: 80,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    'User-Agent': 'MethedApp/1.0',
  },
};

const sendGetRequest = async () => {
  try {
    const data = await new Promise((resolve, reject) => {
      const req = http.request(options, res => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      });
      req.on('error', err => {
        reject(err);
      });
      //req.setHeader('Authorization', API_KEY);
      req.end();
    });
    console.log(JSON.parse(data));
  } catch (err) {
    console.error(err);
  }
};
sendGetRequest();
