import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export interface IProtectedRouteProps extends RouteProps {
}

export function ProtectedRoute ({ ...rest }: IProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <Route {...rest} />
  );
}
