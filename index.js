process.nextTick(() => {
  console.log('Чемодан,');
});

setTimeout(() => {
  setTimeout(() => {
    process.nextTick(() => {
      console.log('На диване');
    });

    console.log('Был диван,');

    setTimeout(() => {
      console.log('Ехал слон.');
    }, 0);
  }, 10);

  setImmediate(() => {
    console.log('В чемодане');
  });
});

setTimeout(() => {
  setImmediate(() => {
    console.log('Кто не верит –');
  });

  setImmediate(() => {
    console.log('Выйди вон!');
  });
}, 20);

console.log('Плыл по морю');
