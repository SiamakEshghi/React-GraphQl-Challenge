import React, { useState } from 'react';

import MenueItems from './MenueItems/MenueItems';
import styles from './Menue.module.scss';

const Menue = (props) => {
  const [showMenue, setShowMenue] = useState(false);

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
