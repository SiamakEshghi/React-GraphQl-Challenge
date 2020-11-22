// @flow
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GET_ARTIST } from '../../graphQL/queries';
import { getArtist } from './utils';
import ImageCard from '../shared/ImageCard/ImageCard';
import ArtistDetails from './ArtistDetails/ArtistDetails';
import Albums from './Albums/Albums';
import Spinner from '../shared/Spinner/Spinner';
import Error from '../shared/Error/Error';
import styles from './Artist.module.scss';

type ArtistProps = {};

const Artist = (props: ArtistProps): React.Node => {
  const { t } = useTranslation();

  const params = useParams();
  const { artistId } = params;

  const [artist, setArtist] = React.useState({});

  const { loading, error } = useQuery(GET_ARTIST, {
    variables: { mbid: artistId },
    onCompleted: (data) => {
      setArtist(getArtist(data));
    },
  });

  const history = useHistory();
  const goToAlbum = (mbid) => {
    history.push(`/artist/${artistId}/album/${mbid}`);
  };

  if (error) return <Error title={t('error.artist')} link="/home" />;

  if (loading) return <Spinner loading={loading} />;

  return (
    <div className={styles.artist}>
      <ImageCard imgUrl={artist?.imgUrl} />
      <ArtistDetails artist={artist} />
      <div className={styles.albums}>
        <Albums albums={artist.albums} albumClickHandler={goToAlbum} />
      </div>
    </div>
  );
};

export default Artist;
