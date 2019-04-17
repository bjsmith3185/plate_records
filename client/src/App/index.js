import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from '../Pages/Home';
import LandingPage from '../Pages/Landing';
// import AccountPage from '../Pages/Account';
// import PopulatePage from '../Pages/Populate';

import * as ROUTES from '../constants/routes';


const App = () => (
  <Router>
    <div>

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      {/* <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.POPULATE} component={PopulatePage} /> */}
       
    </div>
  </Router>
);

export default App;