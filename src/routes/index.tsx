import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Dashboard from 'pages/Dashboard';
import { AuthProvider } from 'context/auth/AuthContext';

import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </AuthProvider>
      </Switch>
    </Router>
  );
};

export default Routes;
