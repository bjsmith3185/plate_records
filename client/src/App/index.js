import React from 'react';
import { Router, Route } from 'react-router-dom';

// import history
import history from '../history/history';

import HomePage from '../Pages/Home';
import LandingPage from '../Pages/Landing';
// import AccountPage from '../Pages/Account';
import PopulatePage from '../Pages/Populate';

import * as ROUTES from '../constants/routes';

import withAuth from '../hoc/withAuth';


const App = () => (
  <Router history={history}>
    <div>

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.HOME} component={withAuth(HomePage)} />
      {/* <Route exact path={ROUTES.ACCOUNT} component={AccountPage} /> */}
      <Route exact path={'/populate'} component={PopulatePage} />
       
    </div>
  </Router>
);

export default App;