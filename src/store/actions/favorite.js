import * as t from './actionTypes';

export const addToFavList = (newFav) => {
  return {
    type: t.ADD_TO_FAV_LIST,
    newFav,
  };
};

export const removeFromFavList = (mbid) => {
  return {
    type: t.REMOVE_FROM_FAV_LIST,
    mbid,
  };
};
