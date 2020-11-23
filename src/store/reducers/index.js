import { combineReducers } from 'redux';

import favReducer from './favorite';

export default combineReducers({
  fav: favReducer,
});
