const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const { createServer } = await import(`node:${protocol}`);
import { readFileSync } from 'node:fs';
import { URLSearchParams } from 'node:url';
import { handleCryptoRequest } from './serverModules/handleCryptoRequest.js';
import { handleAddTickers } from './serverModules/handleAddTickers.js';
import { handleRemoveTickers } from './serverModules/handleRemoveTickers.js';

const NOT_FOUND_MESSAGE = 'Данные не найдены';

const options = {};
if (protocol === 'https') {
  const certDir = '/etc/nginx/acme.sh';
  options['key'] = readFileSync(`${certDir}/rootdiv.ru/privkey.pem`);
  options['cert'] = readFileSync(`${certDir}/rootdiv.ru/fullchain.pem`);
}

export const startServer = (tickers, validTickers) =>
  createServer(options, (req, res) => {
    const query = Object.fromEntries(new URLSearchParams(req.url.split('?')[1]));

    if (req.url.startsWith('/crypto') && req.method === 'GET') {
      handleCryptoRequest(res, query);
      return;
    }
    if (req.url.startsWith('/crypto') && req.method === 'POST') {
      handleAddTickers(req, res, tickers, validTickers);
      return;
    }
    if (req.url.startsWith('/crypto') && req.method === 'DELETE') {
      handleRemoveTickers(res, tickers, query);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: NOT_FOUND_MESSAGE }));
  });
