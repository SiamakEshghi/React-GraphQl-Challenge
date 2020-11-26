export const createArtist = (mbid) => ({
  mbid,
  name: 'name-1',
  begin: '1-1-1997',
  end: '',
  gender: 'female',
  rating: null,
  country: '',
});

export const createFav = (mbid) => ({
  mbid,
  name: `name-${mbid}`,
});
