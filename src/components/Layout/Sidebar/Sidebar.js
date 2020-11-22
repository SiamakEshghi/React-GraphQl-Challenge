// @flow
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.scss';

type SidebarProps = {
  selectFavHandler: (string) => void,
};

const Sidebar = (props: SidebarProps): React.Node => {
  const { selectFavHandler } = props;
  const { favList } = useSelector(({ fav }) => fav);
  const { t } = useTranslation();

  return (
    <ul className={styles.links}>
      <li className={styles.title}>
        <h3>{t('sidebar.title')}</h3>
      </li>
      {favList.map((fav) => {
        const { mbid, name } = fav;
        return (
          <li
            key={mbid}
            className={styles.favLink}
            onClick={() => selectFavHandler(mbid)}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
