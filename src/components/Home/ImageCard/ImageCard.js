// @flow
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './ImageCard.module.scss';
import unknown from '../../../assets/unknown.jpg';

type ImageCardProps = {
  artist: {
    name: string,
    imgUrl: string,
    mbid: string,
  },
};
const ImageCard = (props: ImageCardProps): React.Node => {
  const { artist } = props;
  const { name, imgUrl, mbid } = artist;
  const history = useHistory();

  const toArtistPage = () => {
    history.push(`/artist/${mbid}`);
  };

  return (
    <div className={styles.card} onClick={toArtistPage}>
      <img src={imgUrl || unknown} alt="" className={styles.image} />
      <h2 className={styles.title}>
        <span>{name || 'Artist'}</span>
      </h2>
    </div>
  );
};

export default ImageCard;
