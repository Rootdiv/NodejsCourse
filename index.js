import 'dotenv/config';
import { startServer } from './modules/startServer.js';

const PORT = process.env.PORT || 2023;

const server = startServer();
server.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});
