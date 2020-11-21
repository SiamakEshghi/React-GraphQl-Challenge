import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Menue from './Menue/Menue';
import styles from './Head.module.scss';

const langOptions = ['en', 'fr'];

const Head = (props) => {
  const { t, i18n } = useTranslation();

  const changLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const toHome = (e) => {
    console.log('To home handler');
  };

  return (
    <div className={styles.head}>
      <h2 className={styles.title} onClick={toHome}>
        {t('head.title')}
      </h2>
      <Menue />
    </div>
  );
};

export default Head;
