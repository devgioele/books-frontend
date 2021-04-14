import { Route } from 'react-router-dom';
import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

export const LANDING_ROUTE = '/';
export const SIGNUP_ROUTE = '/signup';
export const LOGIN_ROUTE = '/login';
export const APP_ROUTE = '/app';
export const BOOK_ROUTE = `${APP_ROUTE}/book/:id`;
export const DASHBOARD_ROUTE = `${APP_ROUTE}/dashboard`;
export const EXPLORE_ROUTE = `${DASHBOARD_ROUTE}/explore`;
export const SELL_ROUTE = `${DASHBOARD_ROUTE}/sell`;
export const PROFILE_ROUTE = `${DASHBOARD_ROUTE}/profile`;
export const NO_MATCH_ROUTE = '*';

export const route = (routeName, ...params) => {
  switch (routeName) {
    case LANDING_ROUTE:
      return LANDING_ROUTE;
    case SIGNUP_ROUTE:
      return SIGNUP_ROUTE;
    case BOOK_ROUTE:
      return `${APP_ROUTE}/book/${params[0]}`;
    case EXPLORE_ROUTE:
      return EXPLORE_ROUTE;
    case SELL_ROUTE:
      return SELL_ROUTE;
    case PROFILE_ROUTE:
      return PROFILE_ROUTE;
    default:
      return LANDING_ROUTE;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const renderRoute = (routeName, key) =>
  routeName.isProtected ? (
    <ProtectedRoute
      key={key}
      exact={routeName.isExact}
      path={routeName.path}
      render={(props) => <routeName.component {...props}
                                              routes={routeName.routes} />}
    />
  ) : (
    <Route
      key={key}
      exact={routeName.isExact}
      path={routeName.path}
      render={(props) => <routeName.component {...props}
                                              routes={routeName.routes} />}
    />
  );
