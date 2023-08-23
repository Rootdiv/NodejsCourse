import { EventEmitter } from 'node:events';

//Задание 2
class MessageEvent extends EventEmitter {}

const messageEvent = new MessageEvent();

const receiveMessage = () => {
  messageEvent.prependListener('send', (username, message) => {
    console.log(`Пользователь ${username} написал сообщение: ${message}`);
  });
};

const sendMessage = (username, message) => {
  messageEvent.emit('send', username, message);
};

receiveMessage();

sendMessage('Антон', 'Тест 1');

sendMessage('Михаил', 'Отправил Тест 1');
