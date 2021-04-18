import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
import { LOGIN_ROUTE } from 'routing/helpers';

export default function ProtectedRoute({ render, ...rest }) {
  const auth = useAuth();
  console.log(auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoggedIn() ? (
          render(props)
        ) : (
          <Redirect
            to={{
              pathname: LOGIN_ROUTE,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
