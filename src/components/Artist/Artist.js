// @flow
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { GET_ARTIST } from '../../graphQL/queries';
import { getArtist } from './utils';
import { addToFavList, removeFromFavList } from '../../store/actions';
import ImageCard from '../shared/ImageCard/ImageCard';
import ArtistDetails from './ArtistDetails/ArtistDetails';
import Albums from './Albums/Albums';
import Spinner from '../shared/Spinner/Spinner';
import Error from '../shared/Error/Error';
import Toast from '../shared/Toast/Toast';
import styles from './Artist.module.scss';

type ArtistProps = {};

const Artist = (props: ArtistProps): React.Node => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [toastMessage, setToastMessage] = React.useState('');

  // Get Artist Data And Set Mapped result
  const params = useParams();
  const { artistId } = params;

  const { loading, error, data } = useQuery(GET_ARTIST, {
    variables: { mbid: artistId },
  });

  // Navigate To Album page
  const history = useHistory();
  const goToAlbum = (albumMbid) => {
    history.push(`/artist/${artistId}/album/${albumMbid}`);
  };

  if (loading) return <Spinner loading={loading} />;

  if (error) return <Error title={t('error.artist')} link="/home" />;

  const artist = getArtist(data);

  // Add to and remove from favorite list and trigger toast after add
  const addArtistTofavList = () => {
    dispatch(addToFavList({ name: artist?.name, mbid: artist?.mbid }));
    setToastMessage(`${artist?.name || ''} ${t('artDetails.addToFavToast')}`);
  };
  const removeArtistFromfavList = () => {
    dispatch(removeFromFavList(artist?.mbid));
    setToastMessage(
      `${artist?.name || ''} ${t('artDetails.removeFromFavToast')}`
    );
  };

  return (
    <div className={styles.artist} data-testid="artist-module">
      <ImageCard imgUrl={artist?.imgUrl} />
      <ArtistDetails
        artist={artist}
        addToFaveHandler={addArtistTofavList}
        removeFromFaveHandler={removeArtistFromfavList}
      />
      <div className={styles.albums}>
        <Albums albums={artist.albums} albumClickHandler={goToAlbum} />
      </div>
      <Toast message={toastMessage} onCloseToast={() => setToastMessage('')} />
    </div>
  );
};

export default Artist;
