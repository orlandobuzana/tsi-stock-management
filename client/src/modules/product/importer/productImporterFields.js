import model from 'modules/product/productModel';

const { fields } = model;

export default [
  fields.productLocation,
  fields.productName,
  fields.productDescription,
  fields.productNotes,
  fields.productQt,
  fields.productImg,
  fields.productPrice,
];
