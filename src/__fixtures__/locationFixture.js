const genericFixture = require('./genericFixture');
const LocationRepository = require('../database/repositories/locationRepository');

const locationFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new LocationRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = locationFixture;
