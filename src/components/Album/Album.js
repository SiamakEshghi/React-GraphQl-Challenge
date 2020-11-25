// @flow
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GET_ALBUM } from '../../graphQL/queries';
import { getAlbum } from './utils';
import Spinner from '../shared/Spinner/Spinner';
import Error from '../shared/Error/Error';
import styles from './Album.module.scss';
import type { AlbumType } from './utils';

type AlbumProps = {};

const Album = (props: AlbumProps): React.Node => {
  const { t } = useTranslation();

  // Get Album Data And Set Mapped result
  const params = useParams();
  const { artistId, albumId } = params;
  const [album, setAlbum] = React.useState<?AlbumType>(null);
  const { loading, error } = useQuery(GET_ALBUM, {
    variables: { mbid: albumId },
    onCompleted: (data) => {
      setAlbum(getAlbum(data));
    },
  });

  // Navigate To Artist page
  const history = useHistory();
  const goToArtist = () => {
    history.push(`/artist/${artistId}`);
  };

  if (error)
    return <Error title={t('error.album')} link={`/artist/${artistId}`} />;

  if (loading) return <Spinner loading={loading} />;

  if (!album) return null;

  return (
    <div className={styles.album}>
      <button className={styles.btn} onClick={goToArtist}>
        {t('album.backToArtist')}
      </button>
      <h2>{album.title}Title</h2>
      <h3>{`${t('album.firstReleas')}: ${album.firstReleaseDate || ''}`}</h3>
      <h3>{`${t('album.rating')}: ${album.rating || ''}`}</h3>
      <div className={styles.discogs}>
        <h3>Discogs</h3>
        <ul>
          <li>
            <h4>{`${t('album.discogs.forSaleCount')}: ${
              album.discogs.forSaleCount || ''
            }`}</h4>
          </li>
          <li>
            <h4>{`${t('album.discogs.lowestPrice')}: ${
              album.discogs.lowestPrice || ''
            }`}</h4>
          </li>
          <li>
            <h4>{`${t('album.discogs.year')}: ${album.discogs.year || ''}`}</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Album;
