import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/location/importer/locationImporterSelectors';
import LocationService from 'modules/location/locationService';
import fields from 'modules/location/importer/locationImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'LOCATION_IMPORTER',
  selectors,
  LocationService.import,
  fields,
  i18n('entities.location.importer.fileName'),
);
