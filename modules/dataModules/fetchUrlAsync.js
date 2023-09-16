import https from 'node:https';

export const fetchUrlAsync = async url =>
  new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
      response.on('error', err => {
        reject(err);
      });
    });
  });
