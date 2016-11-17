class Car {
  constructor(id, year, make, model, color) {
    this.id = id;
    this.year = year;
    this.make = make;
    this.model = model;
    this.color = color;
  }
}

class User {
  constructor(id, name, username, website) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.website = website;
  }
}

class Feature {
  constructor(id, name, description, url) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
  }
}

const lvarayut = new User('1', 'Varayut Lerdkanlayanawat', 'lvarayut', 'https://github.com/lvarayut/relay-fullstack');
const features = [
  new Feature('1', 'React', 'A JavaScript library for building user interfaces.', 'https://facebook.github.io/react'),
  new Feature('2', 'Relay', 'A JavaScript framework for building data-driven react applications.', 'https://facebook.github.io/relay'),
  new Feature('3', 'GraphQL', 'A reference implementation of GraphQL for JavaScript.', 'http://graphql.org'),
  new Feature('4', 'Express', 'Fast, unopinionated, minimalist web framework for Node.js.', 'http://expressjs.com'),
  new Feature('5', 'Webpack', 'Webpack is a module bundler that packs modules for the browser.', 'https://webpack.github.io'),
  new Feature('6', 'Babel', 'Babel is a JavaScript compiler. Use next generation JavaScript, today.', 'https://babeljs.io'),
  new Feature('7', 'PostCSS', 'PostCSS. A tool for transforming CSS with JavaScript.', 'http://postcss.org'),
  new Feature('8', 'MDL', 'Material Design Lite lets you add a Material Design to your websites.', 'http://www.getmdl.io')
];

const cars = [
  new Car('1', 2014, 'Ford', 'Focus', '#dedede'),
  new Car('2', 2014, 'Ford', 'Fusion', '#d9d9d9'),
  new Car('3', 2014, 'Toyota', 'Prius', '#e32cd2'),
  new Car('4', 2014, 'Toyota', 'Corola', '#934ded'),
  new Car('5', 2016, 'Toyota', 'Soyota', '#123dec'),
  new Car('6', 2016, 'Renault', 'Clio', '#d9d9d9'),
  new Car('7', 2016, 'Renault', 'Espace', '#e93d32'),
  new Car('8', 2018, 'Citroen', 'C3', '#dedede'),
  new Car('9', 2018, 'Citroen', 'C4', '#dedede'),
  new Car('10', 2018, 'Citroen', 'C5', '#dedede')
];

/*
* Add feature in memory
*/

let curFeatures = 9;
function addFeature(name, description, url) {
  const newFeature = new Feature(curFeatures, name, description, url);
  features.push(newFeature);
  newFeature.id = curFeatures;
  curFeatures += 1;
  return newFeature;
}


function getUser(id) {
  return id === lvarayut.id ? lvarayut : null;
}

function getCar(id) {
  return cars.find(c => c.id === id);
}

function getFeature(id) {
  return features.find(w => w.id === id);
}

function getCars() {
  return cars;
}

function getFeatures() {
  return features;
}

function updateCar(id, { make = null, model = null, year = null, color = null } = {}) {
  const car = getCar(id);
  car.make = make;
  car.model = model;
  car.year = year;
  car.color = color;
  return car;
}

export {
  User,
  Feature,
  Car,
  getUser,
  getCar,
  getCars,
  getFeature,
  getFeatures,
  addFeature,
  updateCar
};
