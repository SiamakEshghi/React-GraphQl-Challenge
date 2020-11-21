export const getArtistsList = (data) => {
  const edges = data?.search?.artists?.edges || [];

  const result = edges.map((edge) => {
    const artist = {};
    artist.name = edge.node.name;
    artist.mbid = edge.node.mbid;
    artist.imgUrl = edge.node.fanArt.thumbnails[0]?.url || '';
    return artist;
  });

  return result;
};

export const getEndCursor = (data) => {
  return data?.search?.artists?.pageInfo?.endCursor || '';
};
