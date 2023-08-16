setTimeout(() => {
  console.log('Выйди вон!');
}, 10);

setTimeout(() => {
  console.log('Был диван,');
}, 0);

process.nextTick(() => {
  console.log('Чемодан,');
});

setImmediate(() => {
  console.log('На диване');
});

setImmediate(() => {
  console.log('Ехал слон.');
});

setImmediate(() => {
  console.log('Кто не верит –');
});

process.nextTick(() => {
  console.log('В чемодане');
});

console.log('Плыл по морю');
