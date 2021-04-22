import { Route } from 'react-router-dom';
import React from 'react';
import ProtectedRoute from 'components/ProtectedRoute';

export const LANDING_ROUTE = '/';
export const SIGNUP_ROUTE = '/signup';
export const LOGIN_ROUTE = '/login';
export const APP_ROUTE = '/app';
export const BOOK_ROUTE = `${APP_ROUTE}/book/:id`;
export const DASHBOARD_ROUTE = `${APP_ROUTE}/dashboard`;
export const EXPLORE_ROUTE = `${DASHBOARD_ROUTE}/explore`;
export const SELL_ROUTE = `${DASHBOARD_ROUTE}/sell`;
export const NEW_SELL_ROUTE = `${SELL_ROUTE}/new`;
export const EDIT_SELL_ROUTE = `${SELL_ROUTE}/edit`;
export const PROFILE_ROUTE = `${DASHBOARD_ROUTE}/profile`;
export const NO_MATCH_ROUTE = '*';

export const toRoute = (routeName, ...params) => {
  switch (routeName) {
    case BOOK_ROUTE:
      return `${APP_ROUTE}/book/${params[0]}`;
    default:
      return routeName;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const renderRoute = (route, key = undefined, extraProps = {}) =>
  route.isProtected ? (
    <ProtectedRoute
      key={key}
      exact={route.isExact}
      path={route.path}
      render={(props) => <route.component {...{ ...props, ...extraProps }}
                                          routes={route.routes} />}
    />
  ) : (
    <Route
      key={key}
      exact={route.isExact}
      path={route.path}
      render={(props) => <route.component {...{ ...props, ...extraProps }}
                                          routes={route.routes} />}
    />
  );
