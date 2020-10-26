import React from 'react';
import {
  Redirect,
  Route as ReactRoute,
  RouteProps as ReactRouteProps,
} from 'react-router-dom';

import { useAuth } from '../context/auth/AuthContext';

interface RouteProps extends ReactRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={() => {
        return isAuthenticated ? <Component /> : <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;
