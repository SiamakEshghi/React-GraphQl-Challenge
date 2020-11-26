// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Search.module.scss';

type SearchProps = {
  searchHandler: (string) => void,
};

const Search = (props: SearchProps): React.Node => {
  const { searchHandler } = props;
  const [value, setValue] = React.useState('');
  const { t } = useTranslation();

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    // debouncing
    let timeout = setTimeout(() => searchHandler(value), 500);
    return () => clearTimeout(timeout);
  }, [value, searchHandler]);

  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      placeholder={t('search.placeHolder')}
      onChange={onChangeHandler}
      name="search"
    />
  );
};

export default Search;
