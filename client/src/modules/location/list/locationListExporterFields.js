import model from 'modules/location/locationModel';

const { fields } = model;

export default [
  fields.id,
  fields.locationName,
  fields.licationImg,
  fields.locationDescription,
  fields.createdAt,
  fields.updatedAt
];
