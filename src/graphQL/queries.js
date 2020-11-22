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
                imageID
                url
                likeCount
              }
            }
          }
        }
      }
    }
  }
`;
