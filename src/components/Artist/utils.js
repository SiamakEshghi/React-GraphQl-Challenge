// @flow

import type { Rating, FanArt } from '../../flowTypes';

type Node = { title?: string, mbid: string };
type Edge = {
  node: Node,
};
type Data = {
  lookup: {
    artist: {
      mbid: string,
      name?: string,
      gender?: string,
      country?: string,
      rating: Rating,
      fanArt: FanArt,
      lifeSpan: {
        begin: string,
        end: string,
      },
      releaseGroups: {
        edges: Edge[],
      },
    },
  },
};

export type ArtistType = {
  mbid: string,
  name?: string,
  gender?: string,
  country?: string,
  rating?: number,
  imgUrl?: string,
  begin?: string,
  end?: string,
  albums: Node[],
};

export const getArtist = (data: Data): ArtistType => {
  const artistData = data.lookup.artist;
  const result: ArtistType = {};

  result.mbid = artistData.mbid;
  result.name = artistData.name;
  result.gender = artistData.gender;
  result.country = artistData.country;
  result.rating = artistData.rating.value;
  result.imgUrl = artistData.fanArt.thumbnails[0]?.url;
  result.begin = artistData.lifeSpan.begin;
  result.end = artistData.lifeSpan.end;
  result.albums = artistData.releaseGroups.edges.map((edg: Edge): Node => ({
    title: edg.node.title,
    mbid: edg.node.mbid,
  }));
  return result;
};
