import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import ImagesField from 'modules/shared/fields/imagesField';

function label(name) {
  return i18n(`entities.location.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  locationName: new StringField('locationName', label('locationName'), {
    "required": true
  }),
  licationImg: new ImagesField('licationImg', label('licationImg'), 'location/licationImg',{
    "max": 2
  }),
  locationDescription: new StringField('locationDescription', label('locationDescription'), {}),
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

};

export default {
  fields,
};
