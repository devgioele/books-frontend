import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
import { EXPLORE_ROUTE } from 'routing/helpers';

export default function GuestRoute({ render, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoggedIn() ? (
          <Redirect
            to={{
              pathname: EXPLORE_ROUTE,
              state: { from: props.location },
            }}
          />
        ) : (
          render(props)
        )
      }
    />
  );
}
