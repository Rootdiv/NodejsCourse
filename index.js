import http from 'node:http';

const options = {
  hostname: 'jsonplaceholder.typicode.com',
  path: '/users',
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
      req.end();
    });
    console.log('Response data for GET request');
    console.log(JSON.parse(data));
  } catch (err) {
    console.error(err);
  }
  // const req = http.request(options, res => {
  //   let data = '';
  //   res.on('data', chunk => {
  //     data += chunk;
  //   });
  //   res.on('end', () => {
  //     console.log('Response data for GET request');
  //     console.log(data);
  //   });
  // });
  // req.on('error', err => {
  //   console.error(err);
  // });
  // req.end();
};
sendGetRequest();

const sendPostRequest = () => {
  options.method = 'POST';
  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Response data for POST request');
      console.log(data);
    });
  });
  req.on('error', err => {
    console.error(err);
  });
  const postData = JSON.stringify({
    title: 'NodeJS',
    body: 'Testing data transmission in node.js',
    userId: 46,
  });
  req.write(postData);
  req.end();
};
sendPostRequest();

const sendPutRequest = () => {
  options.method = 'PUT';
  options.path = '/posts/1';
  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Response data for PUT request');
      console.log(data);
    });
  });
  req.on('error', err => {
    console.error(err);
  });
  const postData = JSON.stringify({
    title: 'NodeJS',
    body: 'Testing data transmission in node.js',
    userId: 46,
  });
  req.write(postData);
  req.end();
};
sendPutRequest();

const sendPatchRequest = () => {
  options.method = 'PATCH';
  options.path = '/posts/1';
  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Response data for PATCH request');
      console.log(data);
    });
  });
  req.on('error', err => {
    console.error(err);
  });
  const postData = JSON.stringify({
    title: 'NodeJS',
    // body: 'Testing data transmission in node.js',
    userId: 46,
  });
  req.write(postData);
  req.end();
};
sendPatchRequest();

const sendDeleteRequest = () => {
  options.method = 'DELETE';
  options.path = '/posts/46';
  const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Response data for DELETE request');
      console.log(data);
    });
  });
  req.on('error', err => {
    console.error(err);
  });
  const postData = JSON.stringify({
    title: 'NodeJS',
    // body: 'Testing data transmission in node.js',
    userId: 46,
  });
  req.write(postData);
  req.end();
};
sendDeleteRequest();
