import { createServer } from 'node:http';
import { parse } from 'node:url';
import { getUsers } from './modules/getUsers.js';
import { readData } from './modules/readData.js';
import { sendErrorMessage } from './modules/sendErrorMessage.js';
import { writeData } from './modules/writeData.js';

const server = createServer(async (req, res) => {
  const { method, url } = req;
  const parsedUrl = parse(url, true);

  if (method === 'GET' && parsedUrl.pathname.startsWith('/users')) {
    return getUsers(req, res);
  }

  if (method === 'POST' && parsedUrl.pathname.startsWith('/users')) {
    if (req.headers['content-type'] !== 'application/json') {
      return sendErrorMessage(res, 415, 'Данные нужно оправлять только в формате json');
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const userData = JSON.parse(body);
        if (!userData.name || !userData.birthdate || !userData.city || !userData.hobby) {
          return sendErrorMessage(res, 400, 'Отсутствуют необходимые данные');
        }
        userData.id = Math.random().toString(36).substring(2, 10);
        const users = await readData('users.json');
        users.push(userData);
        await writeData(res, 'users.json', users, 201);
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(userData));
      } catch (err) {
        console.log(err);
        sendErrorMessage(res, 400, 'Неверный формат данных');
      }
    });
    return;
  }

  if (method === 'DELETE' && parsedUrl.pathname.startsWith('/users/')) {
    const userID = parsedUrl.pathname.substring(7);
    try {
      const users = await readData('users.json');
      const index = users.findIndex(user => user.id === userID);
      if (index === -1) {
        return sendErrorMessage(res, 404, 'Not found');
      }
      users.splice(index, 1);
      await writeData(res, 'users.json', users, 204);
      res.setHeader('Content-Length', '0');
      res.end();
    } catch (err) {
      console.log(err);
      sendErrorMessage(res, 500, 'Server error');
    }
    return;
  }

  if (method === 'PUT' && parsedUrl.pathname.startsWith('/users/')) {
    const userID = parsedUrl.pathname.substring(7);
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const userData = JSON.parse(body);
        const users = await readData('users.json');
        const index = users.findIndex(user => user.id === userID);
        if (index === -1) {
          return sendErrorMessage(res, 404, 'Not found');
        }
        users[index] = { ...userData, id: userID };
        await writeData(res, 'users.json', users, 200);
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`Пользователь с идентификатором ${userID} успешно обновлён`);
      } catch (err) {
        console.log(err);
        sendErrorMessage(res, 500, 'Server error');
      }
    });
    return;
  }

  if (method === 'PATCH' && parsedUrl.pathname.startsWith('/users/')) {
    const userID = parsedUrl.pathname.substring(7);
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const userData = JSON.parse(body);
        const users = await readData('users.json');
        const index = users.findIndex(user => user.id === userID);
        if (index === -1) {
          return sendErrorMessage(res, 404, 'Not found');
        }
        users[index] = { ...users[index], ...userData };
        await writeData(res, 'users.json', users, 200);
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`Данные пользователя с идентификатором ${userID} успешно обновлены`);
      } catch (err) {
        console.log(err);
        sendErrorMessage(res, 500, 'Server error');
      }
    });
    return;
  }

  sendErrorMessage(res, 404, 'Not found');
});

server.listen(3000, 'localhost', () => {
  console.log('Сервер запущен на http://localhost:3000');
});
