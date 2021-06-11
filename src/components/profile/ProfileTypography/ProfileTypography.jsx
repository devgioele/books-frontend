import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EDIT_PROFILE_ROUTE, toRoute } from 'routing/helpers';

export default function ProfileTypography({
  text,
  errorText = 'Missing information',
  show,
  successVariant = 'body1',
  errorVariant = 'body1',
}) {
  const history = useHistory();

  return (
    <>
      {!show && (
        <Link
          variant={errorVariant}
          color="textSecondary"
          onClick={() => history.push(toRoute(EDIT_PROFILE_ROUTE))}
        >
          <b>{errorText}</b>
        </Link>
      )}
      {show && <Typography variant={successVariant}>{text}</Typography>}
    </>
  );
}
