import { createServer } from 'node:http';
import { URLSearchParams } from 'node:url';
import { NOT_FOUND_MESSAGE } from './const.js';
import { goodsRequest } from './goodsRequest.js';
import { categoriesRequest } from './categoriesRequest.js';
import { totalPriceRequest } from './totalRequest.js';
import { productRequest } from './productRequest.js';
import { imageRequest } from './imageRequest.js';
import { categoryGoodsRequest } from './categoryGoodsRequest.js';
import { addProduct } from './addProduct.js';
import { deleteProduct } from './deleteProduct.js';
import { updateProduct } from './updateProduct.js';

export const startServer = () =>
  createServer(async (req, res) => {
    const query = Object.fromEntries(new URLSearchParams(req.url.split('?')[1]));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
      res.end();
      return;
    }

    const URL_PREFIX = '/api/';
    const url = req.url.substring(URL_PREFIX.length);

    //Обрабатываем запрос картинки
    if (req.url.substring(1, 6) === 'image') {
      imageRequest(req, res);
      return;
    }

    //Проверяем, что все запросы приходят с нужного адреса
    if (req.url.startsWith(URL_PREFIX)) {
      //Обрабатываем GET запросы для определённых адресов
      if (req.method === 'GET') {
        if (url.startsWith('goods')) {
          const itemId = url.split('/').pop();
          if (query.page || query.search) {
            goodsRequest(res, query);
            return;
          } else if (itemId !== '') {
            productRequest(itemId, res);
            return;
          }
          goodsRequest(res, query);
          return;
        }

        if (url.startsWith('categories')) {
          if (url.split('/').pop()) {
            categoryGoodsRequest(url, res, query);
          } else {
            categoriesRequest(res);
          }
          return;
        }

        if (url === 'total/' || url === 'total') {
          totalPriceRequest(res);
          return;
        }
      }

      //Обрабатываем остальные запросы для адреса goods
      if (url.startsWith('goods') && req.method === 'POST') {
        await addProduct(req, res);
        return;
      }
      if (url.startsWith('goods') && req.method === 'PATCH') {
        const itemId = url.split('/').pop();
        await updateProduct(req, res, itemId);
        console.log('patch');
        return;
      }
      if (url.startsWith('goods') && req.method === 'DELETE') {
        const itemId = url.split('/').pop();
        await deleteProduct(itemId, res);
        return;
      }
    }

    if (req.url !== '/favicon.ico') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: NOT_FOUND_MESSAGE }));
    }
  });
