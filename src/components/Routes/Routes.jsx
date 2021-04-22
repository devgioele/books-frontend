import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { renderRoute, EXPLORE_ROUTE, NO_MATCH_ROUTE } from 'routing/helpers';

export default function Routes({ routes }) {
  return (
    <Switch>
      {routes.map((route, key) => renderRoute(route, key))}
      <Route path={NO_MATCH_ROUTE}>
        <Redirect to={{ pathname: EXPLORE_ROUTE }} />
      </Route>
    </Switch>
  );
}
