import { GET_ARTIST, GET_ALBUM, GET_ARTISTS_LIST } from '../../graphQL/queries';

export const createArtistMock = (artistId) => {
  const data = {
    lookup: {
      artist: {
        mbid: 'artistId',
        name: 'artistName',
        gender: 'female',
        country: 'CA',
        rating: 4,
        fanArt: {
          thumbnails: [
            {
              url: 'url',
            },
          ],
        },
        lifeSpan: {
          begin: '2-2-1997',
          end: '1-1-20',
        },
        releaseGroups: {
          edges: [
            {
              node: {
                title: 'album1',
                mbid: 'album1Mbid',
              },
            },
            {
              node: {
                title: 'album2',
                mbid: 'album2Mbid',
              },
            },
          ],
        },
      },
    },
  };

  const mocks = [
    {
      request: {
        query: GET_ARTIST,
        variables: {
          mbid: artistId,
        },
      },
      result: {
        data,
      },
    },
  ];

  return mocks;
};

export const createAlbumMock = (albumMbid) => {
  const data = {
    lookup: {
      releaseGroups: {
        title: 'albumTitle',
        firstReleaseDate: '1-1-2000',
        rating: 3,
        discogs: {
          forSaleCount: 2,
          lowestPrice: 1,
          year: 2002,
        },
      },
    },
  };

  const mocks = [
    {
      request: {
        query: GET_ALBUM,
        variables: {
          mbid: albumMbid,
        },
      },
      result: {
        data,
      },
    },
  ];

  return mocks;
};

export const createArtistsListMock = (name) => {
  const endCursor = 'cursor2';

  const data = {
    search: {
      artists: {
        edges: [
          {
            cursor: 'cursor1',
            node: {
              name: 'name1',
              mbid: 'mbid1',
              fanArt: {
                thumbnails: [
                  {
                    url: 'url',
                  },
                ],
              },
            },
          },
          {
            cursor: 'cursor2',
            node: {
              name: 'name2',
              mbid: 'mbid2',
              fanArt: {
                thumbnails: [
                  {
                    url: 'url',
                  },
                ],
              },
            },
          },
        ],
      },
      pageInfo: {
        endCursor,
      },
    },
  };

  const mocks = [
    {
      request: {
        query: GET_ARTISTS_LIST,
        variables: {
          name,
          endCursor,
        },
      },
      result: {
        data,
      },
    },
  ];

  return mocks;
};
