// @flow
import * as React from 'react';

import { useLazyQuery } from '@apollo/client';
import { GET_ARTISTS_LIST } from '../../graphQL/queries';
import { getArtistsList, getEndCursor } from './utils';
import useWindowScroll from '../../hooks/windowsScroll';
import ImageCard from './ImageCard/ImageCard';
import Search from './Search/Search';
import Spinner from '../shared/Spinner/Spinner';
import styles from './Home.module.scss';

type HomeProps = {};

const Home = (props: HomeProps): React.Node => {
  const [artists, setArtists] = React.useState([]);

  const [getArtistsData, { loading }] = useLazyQuery(GET_ARTISTS_LIST, {
    variables: { name: '', endCursor: '' },
    onCompleted: (data) => {
      let artistList;
      if (endCursorRef.current !== '') {
        artistList = [...artists, ...getArtistsList(data)];
      } else {
        artistList = getArtistsList(data);
      }
      setArtists(artistList);

      endCursorRef.current = getEndCursor(data);
    },
    onError: (error) => setArtists([]),
  });

  // for Infinit scroll
  const { isScrolledToBottom } = useWindowScroll();
  const endCursorRef = React.useRef('');
  const nameRef = React.useRef('');

  // fetch more data after scroll to bottom
  React.useEffect(() => {
    if (isScrolledToBottom) {
      getArtistsData({
        variables: { name: nameRef.current, endCursor: endCursorRef.current },
      });
    }
  }, [isScrolledToBottom]);

  const searchForTheArtist = React.useCallback(
    (name) => {
      endCursorRef.current = '';
      nameRef.current = name;
      getArtistsData({ variables: { name } });
    },
    [getArtistsData]
  );

  const renderCards = artists.map((art) => (
    <ImageCard key={art.cursor} artist={art} />
  ));

  return (
    <div className={styles.home}>
      <div className={styles.search}>
        <Search searchHandler={searchForTheArtist} />
      </div>
      {loading && !endCursorRef.current ? ( // new search spinner
        <Spinner loading={loading} />
      ) : (
        <>
          <div className={styles.cards}>{renderCards}</div>
          {/* debouncing spinner*/}
          <Spinner loading={loading} />
        </>
      )}
    </div>
  );
};

export default Home;
