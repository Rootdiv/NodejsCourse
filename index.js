const { userData } = require('mpackage');

const fullUserData = userData({
  name: 'владимир козерец',
  dateBirth: '07.03.1983',
  purpose: 'карьерный Рост',
});

console.log('fullUserData: ', fullUserData);
