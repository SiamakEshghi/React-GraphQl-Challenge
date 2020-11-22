export const getAlbum = (data) => {
  const releaseGroup = data?.lookup?.releaseGroup || {};
  const result = {
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
