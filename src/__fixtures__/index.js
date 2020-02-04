const userFixture = require('./userFixture');
const locationFixture = require('./locationFixture');
const productFixture = require('./productFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  location: locationFixture,
  product: productFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};
