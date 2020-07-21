import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignUp} />
    <Route path="/signin" component={SignIn} />
  </Switch>
);

export default Routes;
