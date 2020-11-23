import { combineReducers } from 'redux';

import favReducer from './favourite';

export default combineReducers({
  fav: favReducer,
});
