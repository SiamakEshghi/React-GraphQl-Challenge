import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './MenueItems.module.scss';

export default (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { show, onCloseHandler } = props;

  const changeCurrentLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const goToHome = () => {
    console.log(goToHome);
  };

  // Animation class
  let classes = [styles.menueItems, styles.close];
  if (show) {
    classes = [styles.menueItems, styles.open];
  }

  return (
    <div className={classes.join(' ')}>
      <div onClick={goToHome}>{t('head.home')}</div>
      <div onClick={changeCurrentLanguage}>{t('head.lang')}</div>
      <div onClick={onCloseHandler}>{t('head.close')}</div>
    </div>
  );
};
