import React from 'react';
import { hydrate } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

import client from './graphQL';
import { ApolloProvider } from '@apollo/client';
import store from './store';
import { Provider } from 'react-redux';
import './lang/i18n';
import { loadableReady } from '@loadable/component';

import './index.scss';
import App from './App';

loadableReady(() => {
  hydrate(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
  );
});

reportWebVitals();
