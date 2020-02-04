import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import IntegerField from 'modules/shared/fields/integerField';
import IntegerRangeField from 'modules/shared/fields/integerRangeField';
import StringField from 'modules/shared/fields/stringField';
import DecimalRangeField from 'modules/shared/fields/decimalRangeField';
import DecimalField from 'modules/shared/fields/decimalField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';
import ImagesField from 'modules/shared/fields/imagesField';

function label(name) {
  return i18n(`entities.product.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  productLocation: new RelationToOneField('productLocation', label('productLocation'), {
    "required": true
  }),
  productName: new StringField('productName', label('productName'), {
    "required": true
  }),
  productDescription: new StringField('productDescription', label('productDescription'), {}),
  productNotes: new StringField('productNotes', label('productNotes'), {
    "max": 255
  }),
  productQt: new IntegerField('productQt', label('productQt'), {
    "required": true
  }),
  productImg: new ImagesField('productImg', label('productImg'), 'product/productImg',{
    "max": 2
  }),
  productPrice: new DecimalField('productPrice', label('productPrice'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  productQtRange: new IntegerRangeField(
    'productQtRange',
    label('productQtRange'),
  ),
  productPriceRange: new DecimalRangeField(
    'productPriceRange',
    label('productPriceRange'),
  ),
};

export default {
  fields,
};
