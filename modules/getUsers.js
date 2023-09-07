import { readFile } from 'node:fs/promises';

export const getUsers = async (req, res) => {
  try {
    const data = await readFile('users.json', 'utf-8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server error');
  }
};
