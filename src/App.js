import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';

const Home = loadable(() => import('./components/Home/Home'));
const Artist = loadable(() => import('./components/Artist/Artist'));
const Album = loadable(() => import('./components/Album/Album'));

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/artist/:artistId" exact>
            <Artist />
          </Route>
          <Route path="/artist/:artistId/album/:albumId" exact>
            <Album />
          </Route>
          <Redirect from="/" to="/home" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
