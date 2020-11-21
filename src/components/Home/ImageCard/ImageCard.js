import React from 'react';

import styles from './ImageCard.module.scss';
import unknown from '../../../assets/unknown.jpg';

const ImageCard = (props) => {
  const { title, url, mbid } = props;

  return (
    <div className={styles.card}>
      <img src={url || unknown} alt="" className={styles.image} />
      <h2 className={styles.title}>
        <span>{title || 'Artist'}</span>
      </h2>
    </div>
  );
};

export default ImageCard;
