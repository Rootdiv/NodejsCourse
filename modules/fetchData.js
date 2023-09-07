export const fetchData = async (httpModule, options) => {
  try {
    return await new Promise((resolve, reject) => {
      const req = httpModule.request(options, res => {
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
  } catch (err) {
    console.error(err);
  }
};
