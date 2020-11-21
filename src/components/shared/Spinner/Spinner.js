// @flow
import * as React from 'react';
import ClipLoader from 'react-spinners/CircleLoader';

import styles from './Spinner.module.scss';

type SpinnerProps = {
  loading: boolean,
};

const Spinner = (props: SpinnerProps): React.Node => {
  const { loading } = props;
  return (
    <div className={styles.spinnerContainer}>
      <ClipLoader loading={loading} color="#ffbb0c" />
    </div>
  );
};

Spinner.defaultProps = {
  loading: false,
};

export default Spinner;
