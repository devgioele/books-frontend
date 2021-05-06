import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
import { AUTH_ROUTE } from 'routing/helpers';

export default function ProtectedRoute({ render, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoggedIn() ? (
          render(props)
        ) : (
          <Redirect
            to={{
              pathname: AUTH_ROUTE,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
