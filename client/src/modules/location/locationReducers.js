import list from 'modules/location/list/locationListReducers';
import form from 'modules/location/form/locationFormReducers';
import view from 'modules/location/view/locationViewReducers';
import destroy from 'modules/location/destroy/locationDestroyReducers';
import importerReducer from 'modules/location/importer/locationImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
