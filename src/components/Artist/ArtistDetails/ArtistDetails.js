// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { addToFavList, removeFromFavList } from '../../../store/actions';
import { IoIosHeart, IoMdHeartEmpty } from 'react-icons/io';
import styles from './ArtistDetails.module.scss';

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
};

const ArtistDetails = (props: ArtistDetailsProps): React.Node => {
  const { artist } = props;
  const { t } = useTranslation();
  const { favList } = useSelector(({ fav }) => fav);
  const dispatch = useDispatch();

  const addArtistTofavList = () => {
    dispatch(addToFavList({ name: artist.name, mbid: artist.mbid }));
  };

  const removeArtistTofavList = () => {
    dispatch(removeFromFavList(artist.mbid));
  };

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
            onClick={removeArtistTofavList}
            className={styles.icon}
          />
        ) : (
          <IoMdHeartEmpty
            onClick={addArtistTofavList}
            className={styles.icon}
          />
        )}
      </h1>
    </div>
  );
};

export default ArtistDetails;
