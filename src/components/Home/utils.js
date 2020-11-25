// @flow

import type { FanArt } from '../../flowTypes';

type Edge = {
  cursor: string,
  node: {
    name?: string,
    mbid: string,
    fanArt: FanArt,
  },
};
type Data = {
  search: {
    artists: {
      edges: Array<Edge>,
      pageInfo: {
        endCursor?: string,
      },
    },
  },
};

type Artist = {
  cursor: string,
  imgUrl: string,
  mbid: string,
  name?: string,
};

export type ArtistsList = Array<Artist>;

export const getArtistsList = (data: Data): ArtistsList => {
  const edges = data.search.artists.edges;

  const result: ArtistsList = edges.map((edge: Edge): Artist => {
    const artist = {};
    artist.name = edge.node.name;
    artist.mbid = edge.node.mbid;
    artist.imgUrl = edge.node.fanArt.thumbnails[0]?.url || '';
    artist.cursor = edge.cursor;

    return artist;
  });
  return result;
};

export const getEndCursor = (data: Data): string => {
  return data.search.artists.pageInfo.endCursor || '';
};
