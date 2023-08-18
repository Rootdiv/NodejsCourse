exports.sayHello = () => {
  console.log('Hello node.js');
};

const user = {
  firstname: 'Владимир',
  lastname: 'Козерец',
};

const map = new Map();

class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  showTitle() {
    return this.brand + ' ' + this.model;
  }
}

// module.exports = {
//   sayHello,
//   user,
//   map,
//   Car,
// };

exports.user = user;
exports.map = map;
exports.Car = Car;
