module.exports = (app) => {
  app.post(`/location`, require('./locationCreate'));
  app.put(`/location/:id`, require('./locationUpdate'));
  app.post(`/location/import`, require('./locationImport'));
  app.delete(`/location`, require('./locationDestroy'));
  app.get(
    `/location/autocomplete`,
    require('./locationAutocomplete'),
  );
  app.get(`/location`, require('./locationList'));
  app.get(`/location/:id`, require('./locationFind'));
};
