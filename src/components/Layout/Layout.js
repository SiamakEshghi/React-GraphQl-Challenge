import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Head from './Head/Head';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './Layout.module.scss';

const Layout = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { windowWidth } = useWindowDimensions();
  const { t } = useTranslation();

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
        Sidebar
      </div>
      <div className={styles.main}>Hi</div>
    </div>
  );
};

export default Layout;
