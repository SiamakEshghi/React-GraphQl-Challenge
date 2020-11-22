export const getArtist = (data) => {
  const artist = data?.lookup?.artist || {};
  const result = {};

  result.name = artist.name;
  result.mbid = artist.mbid;
  result.gender = artist.gender;
  result.country = artist.country;
  result.rating = artist.rating.value;
  result.imgUrl = artist.fanArt?.thumbnails[0]?.url;
  result.begin = artist.lifeSpan?.begin;
  result.end = artist.lifeSpan?.end;
  result.albums = artist.releaseGroups?.edges?.map((edg) => ({
    title: edg.node?.title,
    mbid: edg.node?.mbid,
  }));
  return result;
};
