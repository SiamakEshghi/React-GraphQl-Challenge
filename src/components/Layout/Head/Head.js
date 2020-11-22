import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Menue from './Menue/Menue';
import styles from './Head.module.scss';

const Head = (props) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const changLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const toHome = (e) => {
    history.push('/home');
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
