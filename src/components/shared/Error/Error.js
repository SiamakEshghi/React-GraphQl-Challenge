// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { IoIosSad } from 'react-icons/io';

import styles from './Error.module.scss';

type ErrorProps = {
  title: string,
  link: string,
};

const Error = (props: ErrorProps): React.Node => {
  const { title, link } = props;
  const { t } = useTranslation();
  const history = useHistory();

  const clickHere = (e) => {
    e.preventDefault();
    history.push(link);
  };

  return (
    <h2 className={styles.error}>
      {`${t('error.message')} ${title}`}
      <IoIosSad />
      <span>
        <button onClick={clickHere}>{t('general.clickHere')}</button>
      </span>
    </h2>
  );
};

export default Error;
