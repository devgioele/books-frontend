import { Route } from 'react-router-dom';
import React from 'react';
import ProtectedRoute from 'components/routing/ProtectedRoute';
import GuestRoute from 'components/routing/GuestRoute';
import RoutePrivileges from './privileges';

export const LANDING_ROUTE = '/';
export const CONFIRM_ROUTE = '/confirm/:transactionId';
export const AUTH_ROUTE = '/login';
export const APP_ROUTE = '/app';
export const BOOK_ROUTE = `${APP_ROUTE}/book/:id`;
export const DASHBOARD_ROUTE = `${APP_ROUTE}/dashboard`;
export const EXPLORE_ROUTE = `${DASHBOARD_ROUTE}/explore`;
export const SELL_ROUTE = `${DASHBOARD_ROUTE}/sell`;
export const NEW_SELL_ROUTE = `${SELL_ROUTE}/new`;
export const EDIT_SELL_ROUTE = `${SELL_ROUTE}/edit`;
export const REMOVE_SELL_ROUTE = `${SELL_ROUTE}/remove`;
export const LINK_SELL_ROUTE = `${SELL_ROUTE}/link`;
export const PROFILE_ROUTE = `${DASHBOARD_ROUTE}/profile`;
export const EDIT_PROFILE_ROUTE = `${PROFILE_ROUTE}/edit`;
export const EDIT_PROFILE_PICTURE_ROUTE = `${PROFILE_ROUTE}/picture`;
export const NO_MATCH_ROUTE = '*';

export const toRoute = (routeName, ...params) => {
  switch (routeName) {
    case BOOK_ROUTE:
      return `${APP_ROUTE}/book/${params[0]}`;
    default:
      return routeName;
  }
};

export const renderRoute = (route, extraProps = {}) => {
  switch (route.privilege) {
    case RoutePrivileges.AUTHENTICATED:
      return (
        <ProtectedRoute
          key={route.path}
          exact={route.isExact}
          path={route.path}
          render={(props) => (
            <route.component
              {...{ ...props, ...extraProps }}
              routes={route.routes}
            />
          )}
        />
      );
    case RoutePrivileges.GUEST:
      return (
        <GuestRoute
          key={route.path}
          exact={route.isExact}
          path={route.path}
          render={(props) => (
            <route.component
              {...{ ...props, ...extraProps }}
              routes={route.routes}
            />
          )}
        />
      );
    default:
      return (
        <Route
          key={route.path}
          exact={route.isExact}
          path={route.path}
          render={(props) => (
            <route.component
              {...{ ...props, ...extraProps }}
              routes={route.routes}
            />
          )}
        />
      );
  }
};
