import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignUp} />
    <Route path="/signin" component={SignIn} />

    <Route path="/dashboard" component={SignIn} isPrivate />
  </Switch>
);

export default Routes;
