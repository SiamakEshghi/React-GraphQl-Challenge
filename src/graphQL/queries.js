import { gql } from '@apollo/client';

export const GET_ARTISTS_LIST = gql`
  query GetArtists($name: String!, $endCursor: String!) {
    search {
      artists(query: $name, first: 20, after: $endCursor) {
        pageInfo {
          endCursor
        }
        edges {
          cursor
          node {
            mbid
            name
            fanArt {
              thumbnails {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ARTIST = gql`
  query GetArtist($mbid: MBID!) {
    lookup {
      artist(mbid: $mbid) {
        name
        mbid
        gender
        country
        rating {
          value
        }
        fanArt {
          thumbnails {
            url
          }
        }

        lifeSpan {
          begin
          end
        }
        releaseGroups(type: ALBUM, first: 5) {
          edges {
            node {
              title
              mbid
            }
          }
        }
      }
    }
  }
`;

export const GET_ALBUM = gql`
  query GetArtist($mbid: MBID!) {
    lookup {
      releaseGroup(mbid: $mbid) {
        title
        firstReleaseDate
        rating {
          value
        }
        discogs {
          forSaleCount
          lowestPrice
          year
        }
      }
    }
  }
`;
