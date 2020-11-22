// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import useWindowDimensions from '../../hooks/windowDimensions';
import Head from './Head/Head';
import Sidebar from './Sidebar/Sidebar';
import styles from './Layout.module.scss';

type LayoutProps = {
  children?: React.Node,
};

const Layout = (props: LayoutProps): React.Node => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const { windowWidth } = useWindowDimensions();
  const { t } = useTranslation();
  const history = useHistory();

  const toArtistPage = (mbid) => {
    setShowSidebar(false);
    history.push(`/artist/${mbid}`);
  };

  //Hide sidebar for phone devices and show if showSidebar = true
  const sidebarStyle =
    windowWidth < 600 ? { display: showSidebar ? 'inline' : 'none' } : {};

  return (
    <div className={styles.layout}>
      <div className={styles.head}>
        <Head />
      </div>
      <button
        className={styles.btn}
        onClick={() => setShowSidebar((prevShowSidebar) => !prevShowSidebar)}
      >
        {showSidebar ? t('layout.closeFav') : t('layout.openFav')}
      </button>
      <div className={styles.sidebar} style={sidebarStyle}>
        <Sidebar selectFavHandler={toArtistPage} />
      </div>
      <div className={styles.main}>{props.children}</div>
    </div>
  );
};

export default Layout;
