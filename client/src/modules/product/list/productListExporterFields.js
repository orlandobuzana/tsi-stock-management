import model from 'modules/product/productModel';

const { fields } = model;

export default [
  fields.id,
  fields.productLocation,
  fields.productName,
  fields.productDescription,
  fields.productNotes,
  fields.productQt,
  fields.productImg,
  fields.productPrice,
  fields.createdAt,
  fields.updatedAt
];
