// @flow
import * as React from 'react';

import styles from './Toast.module.scss';

type ToastProps = {
  message?: string,
  onCloseToast: () => void,
};

const Toast = (props: ToastProps): React.Node => {
  const { message, onCloseToast } = props;

  if (!message) return null;

  return (
    <div className={styles.toast}>
      <h4>{message}</h4>
      <button onClick={onCloseToast}>X</button>
    </div>
  );
};

export default Toast;
