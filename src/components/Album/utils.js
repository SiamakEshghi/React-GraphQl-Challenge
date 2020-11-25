// @flow
import type { Rating } from '../../flowTypes';
type DiscogsType = {
  forSaleCount?: number,
  lowestPrice?: number,
  year?: number,
};

type Data = {
  lookup: {
    releaseGroup: {
      title?: string,
      firstReleaseDate?: string,
      rating: Rating,
      discogs?: DiscogsType,
    },
  },
};

export type AlbumType = {
  title?: string,
  firstReleaseDate?: string,
  rating?: number,
  discogs: DiscogsType,
};

export const getAlbum = (data: Data): AlbumType => {
  const { releaseGroup } = data.lookup;
  const result: AlbumType = {
    discogs: {},
  };
  result.title = releaseGroup.title;
  result.firstReleaseDate = releaseGroup.firstReleaseDate;
  result.rating = releaseGroup.rating.value;
  result.discogs.forSaleCount = releaseGroup.discogs?.forSaleCount;
  result.discogs.lowestPrice = releaseGroup.discogs?.lowestPrice;
  result.discogs.year = releaseGroup.discogs?.year;

  return result;
};
