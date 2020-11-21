import React from 'react';

import ImageCard from './ImageCard/ImageCard';
import styles from './Home.module.scss';

const Home = (props) => {
  const renderCards = () => {
    const cards = [];

    for (let i = 0; i < 10; i++) {
      cards.push(<ImageCard />);
    }

    return cards;
  };
  return (
    <div>
      <div>Search</div>
      <div className={styles.cards}>{renderCards()}</div>
    </div>
  );
};

export default Home;
