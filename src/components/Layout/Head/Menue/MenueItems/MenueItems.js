// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import styles from './MenueItems.module.scss';

type MenueItemProps = {
  show?: boolean,
  onCloseHandler?: () => void,
};

export default (props: MenueItemProps): React.Node => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { show, onCloseHandler } = props;

  const changeCurrentLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const toHome = (e) => {
    history.push('/home');
  };

  // For adding animation class
  let classes = [styles.menueItems, styles.close];
  if (show) {
    classes = [styles.menueItems, styles.open];
  }

  return (
    <div className={classes.join(' ')}>
      <div onClick={toHome}>{t('head.home')}</div>
      <div onClick={changeCurrentLanguage}>{t('head.lang')}</div>
      <div onClick={onCloseHandler}>{t('head.close')}</div>
    </div>
  );
};
