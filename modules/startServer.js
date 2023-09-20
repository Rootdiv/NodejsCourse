import { createServer } from 'node:http';
import { URLSearchParams } from 'node:url';
import { NOT_FOUND_MESSAGE } from './const.js';
import { goodsRequest } from './goodsRequest.js';
import { categoriesRequest } from './categoriesRequest.js';
import { totalPriceRequest } from './totalRequest.js';
import { productRequest } from './productRequest.js';
import { imageRequest } from './imageRequest.js';

export const startServer = () =>
  createServer(async (req, res) => {
    const query = Object.fromEntries(new URLSearchParams(req.url.split('?')[1]));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    const URL_PREFIX = '/api/';
    const url = req.url.substring(URL_PREFIX.length);

    //Обрабатываем запрос картинки
    if (req.url.substring(1, 6) === 'image') {
      imageRequest(req, res);
      return;
    }

    //Проверяем, что все запросы приходят с нужного адреса
    if (req.url.startsWith('/api/')) {
      //Обрабатываем GET запросы для определённых адресов
      if (req.method === 'GET') {
        if (url === 'goods/') {
          goodsRequest(res, query);
          return;
        }

        if (url.startsWith('goods/')) {
          productRequest(url, res);
          return;
        }

        if (url === 'categories/') {
          categoriesRequest(res);
          return;
        }

        if (url === 'total/') {
          totalPriceRequest(res);
          return;
        }
      }

      //Обрабатываем остальные запросы для адреса goods
      if (req.url.includes('goods') && req.method === 'POST') {
        return;
      }
      if (req.url.includes('goods') && req.method === 'PATCH') {
        return;
      }
      if (req.url.includes('goods') && req.method === 'DELETE') {
        return;
      }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: NOT_FOUND_MESSAGE }));
  });
