import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Spinner from './components/shared/Spinner/Spinner';
import Layout from './components/Layout/Layout';
import './App.scss';

const Home = lazy(() => import('./components/Home/Home'));
const Artist = lazy(() => import('./components/Artist/Artist'));
const Album = lazy(() => import('./components/Album/Album'));

function App() {
  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<></>}>
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
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
