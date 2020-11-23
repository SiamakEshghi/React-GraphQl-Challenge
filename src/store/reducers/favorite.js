import * as t from '../actions/actionTypes';

const INITIAL_STATE = {
  favList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.ADD_TO_FAV_LIST:
      return { favList: [...state.favList, action.newFav] };
    case t.REMOVE_FROM_FAV_LIST:
      const updatedFavList = state.favList.filter(
        (fav) => fav.mbid !== action.mbid
      );
      return { favList: updatedFavList };
    default:
      return state;
  }
};
