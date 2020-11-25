import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/lang/i18n';

import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import store from '../src/store';
import { ApolloProvider } from '@apollo/client';
import client from '../src/graphQL/serverSideClient';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/*', (req, res) => {
  const indexFile = path.resolve('./build/index.html');

  // loadable
  const statsFile = path.resolve('server-build/loadable-stats.json');
  const extractor = new ChunkExtractor({ statsFile });
  const jsx = extractor.collectChunks(<App />);

  // react router
  const context = {};

  // apollo server
  const serverClient = client(req);

  fs.readFile(indexFile, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    const body = ReactDOMServer.renderToString(
      <ApolloProvider client={serverClient}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <I18nextProvider i18n={req.i18n}>{jsx}</I18nextProvider>
          </StaticRouter>
        </Provider>
      </ApolloProvider>
    );

    // Redirect
    if (context.url) {
      return res.redirect(301, context.url);
    }

    //loadable tags
    const scriptTags = extractor.getScriptTags();

    // collect tags
    var htmlData = htmlData.replace('</head>', `${scriptTags}</head>`);

    //collect body
    var htmlData = htmlData.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`
    );

    return res.send(htmlData);
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
