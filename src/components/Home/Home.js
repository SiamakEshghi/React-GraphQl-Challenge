import * as React from 'react';

import { useLazyQuery } from '@apollo/client';
import { GET_ARTISTS_LIST } from '../../graphQL/queries';
import { getArtistsList, getEndCursor } from './utils';
import ImageCard from './ImageCard/ImageCard';
import Search from './Search/Search';
import Spinner from '../shared/Spinner/Spinner';
import styles from './Home.module.scss';

const Home = (props) => {
  const [artists, setArtists] = React.useState([]);

  const endCursorRef = React.useRef(''); // for Infinit scroll

  const [getArtistsData, { loading }] = useLazyQuery(GET_ARTISTS_LIST, {
    variables: { name: '', endCursor: '' },
    onCompleted: (data) => {
      endCursorRef.current = getEndCursor(data);

      const artists = getArtistsList(data);
      setArtists(artists);
    },
    onError: (error) => setArtists([]),
  });

  const searchForTheArtist = React.useCallback(
    (name) => {
      endCursorRef.current = '';
      getArtistsData({ variables: { name } });
    },
    [getArtistsData]
  );

  const renderCards = artists.map((art) => (
    <ImageCard
      key={art.mbid}
      mbid={art.mbid}
      title={art.name}
      url={art.imgUrl}
    />
  ));

  return (
    <div className={styles.home}>
      <div className={styles.search}>
        <Search searchHandler={searchForTheArtist} />
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className={styles.cards}>{renderCards}</div>
      )}
    </div>
  );
};

export default Home;
