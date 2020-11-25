// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Albums.module.scss';

type Album = {
  title?: string,
  mbid: string,
};
type AlbumsProps = {
  albums: ?(Album[]),
  albumClickHandler: (string) => void,
};

const Albums = (props: AlbumsProps): React.Node => {
  const { albums, albumClickHandler } = props;
  const { t } = useTranslation();

  if (!albums) return null;

  return (
    <div className={styles.albums}>
      <h2>{t('artDetails.albums.title')}</h2>
      <div className={styles.cards}>
        {albums.map((al) => (
          <div
            key={al.mbid}
            className={styles.albumCard}
            onClick={() => albumClickHandler(al.mbid)}
          >
            <h3>{al.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
