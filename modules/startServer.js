import { createServer } from 'node:http';
import { URLSearchParams } from 'node:url';
import { handleCryptoRequest } from './serverModules/handleCryptoRequest.js';
import { handleAddTickers } from './serverModules/handleAddTickers.js';
import { handleRemoveTickers } from './serverModules/handleRemoveTickers.js';

const NOT_FOUND_MESSAGE = 'Данные не найдены';

export const startServer = (tickers, validTickers) =>
  createServer((req, res) => {
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
