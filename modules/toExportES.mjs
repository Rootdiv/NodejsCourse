export const sayHello = () => {
  console.log('Hello node.js');
};

export const user = {
  firstname: 'Владимир',
  lastname: 'Козерец',
};

export const map = new Map();

export class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  showTitle() {
    return this.brand + ' ' + this.model;
  }
}
