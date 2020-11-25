// @flow
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import './App.scss';

const Home = React.lazy(() => import('./components/Home/Home'));
const Artist = React.lazy(() => import('./components/Artist/Artist'));
const Album = React.lazy(() => import('./components/Album/Album'));

type AppProps = {};

function App(props: AppProps): React.Node {
  return (
    <div className="App">
      <Layout>
        <React.Suspense fallback={<></>}>
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
        </React.Suspense>
      </Layout>
    </div>
  );
}

export default App;
