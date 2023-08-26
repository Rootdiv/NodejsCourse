import { EventEmitter } from 'node:events';
import { appendFile, copyFile, stat, open } from 'node:fs/promises';

class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = false;
  }

  log(message) {
    this.logQueue.unshift(message);
    if (!this.writing) {
      this.writeLog();
    } else {
      this.writing = true;
    }
  }

  async writeLog() {
    this.emit('messageLogged', this.logQueue);
    try {
      await appendFile(this.filename, `${this.logQueue}\n`);
      this.logQueue = [];
    } catch (err) {
      console.error('Ошибка при записи в файл', err);
    }

    this.checkFileSize();

    if (this.logQueue.length < 0) {
      this.writeLog();
    } else {
      this.writing = false;
    }
  }

  async getFileSize() {
    try {
      const statLog = await stat(this.filename);
      return statLog.size;
    } catch (err) {
      console.error('Ошибка получения информации о файле', err);
      return 0;
    }
  }

  async checkFileSize() {
    if ((await this.getFileSize()) > this.maxSize) {
      this.rotateLog();
    }
  }

  async rotateLog() {
    let filehandle = null;
    try {
      await copyFile(this.filename, `${this.filename}.bak`);
      filehandle = await open(this.filename, 'r+');
      await filehandle.truncate(0);
    } finally {
      await filehandle?.close();
    }
  }
}

const logger = new Logger('log.txt', 1024);

logger.on('messageLogged', message => {
  console.log('Записано сообщение:', message);
});

logger.log('Первое сообщение');

logger.log('Второе сообщение');
