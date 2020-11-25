// @flow
import * as React from 'react';

import MenueItems from './MenueItems/MenueItems';
import styles from './Menue.module.scss';

type MenueProps = {};

const Menue = (props: MenueProps): React.Node => {
  const [showMenue, setShowMenue] = React.useState(false);

  return (
    <div>
      {!showMenue && (
        <div onClick={() => setShowMenue(true)} className={styles.box}>
          <span className={styles.menueIcon}>&nbsp;</span>
        </div>
      )}
      <MenueItems show={showMenue} onCloseHandler={() => setShowMenue(false)} />
    </div>
  );
};

export default Menue;
