// @flow
import * as React from 'react';

import styles from './ImageCard.module.scss';
import unknown from '../../../assets/unknown.jpg';

type ImageCardProps = {
  name?: string,
  imgUrl?: string,
  mbid?: string,
  imageOnclickHandler?: (mbid: string) => void,
};
const ImageCard = (props: ImageCardProps): React.Node => {
  const { name, imgUrl, mbid, imageOnclickHandler } = props;

  return (
    <div
      className={styles.card}
      onClick={() => {
        return imageOnclickHandler && mbid ? imageOnclickHandler(mbid) : null;
      }}
    >
      <img src={imgUrl || unknown} alt="" className={styles.image} />
      <h2 className={styles.title}>
        {name && <span>{name || 'Artist'}</span>}
      </h2>
    </div>
  );
};

export default ImageCard;
