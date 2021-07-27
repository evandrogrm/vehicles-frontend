import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export interface IPrivateRouteProps extends RouteProps {
}

export function PrivateRoute ({ ...rest }: IPrivateRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/veiculos" />;
  }
  return (
    <Route {...rest} />
  );
}
