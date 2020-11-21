import { useTranslation } from 'react-i18next';

import Layout from './components/Layout/Layout';
import './App.scss';

function App() {
  const { t, i18n } = useTranslation();

  console.log(t('head.title'));
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
