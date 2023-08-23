import { EventEmitter } from 'node:events';

class User extends EventEmitter {
  constructor({ name, age }) {
    super();
    this.name = name;
    this.age = age;
  }

  sleep(ms) {
    const emit = this.emit;
    this.emit = () => {};
    setTimeout(() => {
      this.emit = emit;
    }, ms);
  }

  emit(name, ...args) {
    super.emit(name, ...args);
    console.log('logger:', name, args);
  }
}

const user = new User({ name: 'Mark', age: 33 });

user.on('foo', x => {
  console.log('on foo', x);
});

user.on('bar', x => {
  console.log('on bar', x);
});

user.emit('bar', { a: 1 });
user.emit('foo', { b: 2 });

user.sleep(1000);

setTimeout(() => {
  user.emit('bar', { a: 3 });
  user.emit('foo', { b: 4 });
}, 500);

setTimeout(() => {
  user.emit('bar', { a: 5 });
  user.emit('foo', { b: 6 });
}, 1500);

//ee.setMaxListeners(1);
//console.log(ee.getMaxListeners());

// ee.prependListener('bar', x => {
//   console.log('prependListener', x);
//   x.cia = 'шпион';
// });

// ee.once('foo', x => {
//   console.log('once', x);
// });

// ee.on('foo', x => {
//   console.log('addListener', x);
// });
// console.log(ee.listenerCount('foo'));
//ee.removeAllListeners('foo');
//ee.removeListener('foo', logger);
//ee.off('foo', logger);
//ee.emit('error', new Error('Ошибка'));
// console.log(ee.listenerCount('foo'));
