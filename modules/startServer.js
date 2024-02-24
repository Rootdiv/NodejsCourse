const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const { createServer } = await import(`node:${protocol}`);
import { readFileSync } from 'node:fs';
import { URLSearchParams } from 'node:url';
import { NOT_FOUND_DATA, NOT_FOUND_MESSAGE } from './const.js';
import { goodsRequest } from './serverModules/goodsRequest.js';
import { categoriesRequest } from './serverModules/categoriesRequest.js';
import { totalPriceRequest } from './serverModules/totalRequest.js';
import { productRequest } from './serverModules/productRequest.js';
import { imageRequest } from './serverModules/imageRequest.js';
import { categoryGoodsRequest } from './serverModules/categoryGoodsRequest.js';
import { addProduct } from './serverModules/addProduct.js';
import { deleteProduct } from './serverModules/deleteProduct.js';
import { updateProduct } from './serverModules/updateProduct.js';

const options = {};
if (protocol === 'https') {
  const domain = 'rootdiv.ru';
  const certDir = '/etc/nginx/acme.sh';
  options['key'] = readFileSync(`${certDir}/${domain}/privkey.pem`);
  options['cert'] = readFileSync(`${certDir}/${domain}/fullchain.pem`);
}

export const startServer = () =>
  createServer(options, async (req, res) => {
    const query = Object.fromEntries(new URLSearchParams(req.url.split('?')[1]));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'OPTIONS') {
      res.end();
      return;
    }

    const URL_PREFIX = '/api';
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
        if (url === '/goods/?search=') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(NOT_FOUND_DATA));
          return;
        }
        if (url.startsWith('/goods')) {
          const itemId = url.split('/').pop();
          if (query.page || query.search) {
            goodsRequest(res, query);
            return;
          } else if (itemId !== '' && itemId !== 'goods') {
            productRequest(itemId, res);
            return;
          }
          goodsRequest(res, query);
          return;
        }

        if (url.startsWith('/categories')) {
          const category = url.split('/').pop();
          if (category && category !== 'categories') {
            categoryGoodsRequest(url, res, query);
          } else {
            categoriesRequest(res);
          }
          return;
        }

        if (url.startsWith('/total')) {
          totalPriceRequest(res);
          return;
        }
      }

      //Обрабатываем остальные запросы для адреса goods
      if (url.startsWith('/goods') && req.method === 'POST') {
        await addProduct(req, res);
        return;
      }
      if (url.startsWith('/goods') && req.method === 'PATCH') {
        const itemId = url.split('/').pop();
        await updateProduct(req, res, itemId);
        return;
      }
      if (url.startsWith('/goods') && req.method === 'DELETE') {
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
