// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import Menue from './Menue/Menue';
import styles from './Head.module.scss';

type HeadProps = {};

const Head = (props: HeadProps): React.Node => {
  const { t } = useTranslation();
  const history = useHistory();

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
