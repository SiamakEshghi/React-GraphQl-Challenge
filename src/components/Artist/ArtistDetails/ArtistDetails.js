// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { IoIosHeart, IoMdHeartEmpty } from 'react-icons/io';
import styles from './ArtistDetails.module.scss';
import { addToFavList } from '../../../store/actions';

type ArtistDetailsProps = {
  artist: {
    name?: string,
    begin?: string,
    end?: string,
    gender?: string,
    rating?: number,
    country?: string,
    mbid?: string,
  },
  addToFaveHandler: () => void,
  removeFromFaveHandler: () => void,
};

const ArtistDetails = (props: ArtistDetailsProps): React.Node => {
  const { artist, addToFaveHandler, removeFromFaveHandler } = props;
  const { t } = useTranslation();
  const { favList } = useSelector(({ fav }) => fav);

  return (
    <div className={styles.artDetails}>
      <h2>
        {t('artDetails.name')}:&nbsp;{artist.name}
      </h2>
      <h3>
        {t('artDetails.gender')}:&nbsp;{artist.gender}
      </h3>
      <h3>
        {t('artDetails.country')}:&nbsp;{artist.country}
      </h3>
      <h3>
        {t('artDetails.begin')}:&nbsp;{artist.begin}
      </h3>
      <h3>
        {t('artDetails.end')}:&nbsp;{artist.end}
      </h3>
      <h3>
        {t('artDetails.rating')}:&nbsp;{artist.rating}
      </h3>
      <h1>
        {favList.some((fav) => fav.mbid === artist.mbid) ? (
          <IoIosHeart
            color="red"
            onClick={removeFromFaveHandler}
            className={styles.icon}
          />
        ) : (
          <IoMdHeartEmpty onClick={addToFaveHandler} className={styles.icon} />
        )}
      </h1>
    </div>
  );
};

export default ArtistDetails;
