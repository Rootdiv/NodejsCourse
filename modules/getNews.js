import { request } from 'node:https';
import { stringify } from 'node:querystring';
import 'dotenv/config';
import { showNews } from './showNews.js';

export const getNews = async query => {
  const options = {
    hostname: 'newsapi.org',
    path: `/v2/top-headlines?${stringify(query)}`,
    headers: {
      'X-Api-Key': process.env.API_KEY,
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': 'MethedApp/1.0',
    },
  };

  try {
    const data = await new Promise((resolve, reject) => {
      const req = request(options, res => {
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
      req.end();
    });

    showNews(data);
  } catch (err) {
    console.error(err);
  }
};
