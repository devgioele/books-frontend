import { Route } from 'react-router-dom';
import React from 'react';
import ProtectedRoute from 'components/ProtectedRoute';

const debugging = true;
export const BASE_URL = debugging ? 'https://localhost:7000' : '';

export const LANDING_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const APP_ROUTE = '/app';
export const BOOK_ROUTE = `${APP_ROUTE}/book/:id`;
export const DASHBOARD_ROUTE = `${APP_ROUTE}/dashboard`;
export const EXPLORE_ROUTE = `${DASHBOARD_ROUTE}/explore`;
export const SELL_ROUTE = `${DASHBOARD_ROUTE}/sell`;
export const PROFILE_ROUTE = `${DASHBOARD_ROUTE}/profile`;
export const NO_MATCH_ROUTE = '*';

export const renderRoute = (route, key) =>
  route.isProtected ? (
    <ProtectedRoute
      key={key}
      exact={route.isExact}
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  ) : (
    <Route
      key={key}
      exact={route.isExact}
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
