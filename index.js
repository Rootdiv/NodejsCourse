import { EventEmitter } from 'node:events';

//Задание 1
class TimerEvent extends EventEmitter {}

const timerEvent = new TimerEvent();

timerEvent.addListener('tick', tick => {
  console.log('Tick -', tick);
});

let num = 1;

const timer = tick => {
  timerEvent.emit('tick', tick);
};

const intervalID = setInterval(() => {
  timer(num++);
  if (num > 8) {
    clearInterval(intervalID);
  }
}, 1000);
