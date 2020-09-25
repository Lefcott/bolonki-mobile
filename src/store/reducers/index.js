import { combineReducers } from 'redux';

import language from './language';
import section from './section';
import polygons from './polygons';

export default combineReducers({ language, section, polygons });
