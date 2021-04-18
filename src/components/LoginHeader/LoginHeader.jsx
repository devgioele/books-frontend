import Grid from '@material-ui/core/Grid';
import CloudImage from 'components/CloudImage';
import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import COMPILATION_PROGRESS from 'screens/Login/compilationProgress';
import STD_MESSAGES from 'messages/standard';

const useStyles = makeStyles(() => ({
  logo: {
    minWidth: '125px',
    width: 'auto',
    height: '80px',
  },
}));

function renderText(progress) {
  switch (progress) {
    case COMPILATION_PROGRESS.IDENTIFICATION:
      return `We will log you in or create an account if you don't have one already.`;
    case COMPILATION_PROGRESS.LOGIN:
      return `Nice to see you again!`;
    case COMPILATION_PROGRESS.SIGNUP:
      return `This is going to be great!`;
    default:
      return STD_MESSAGES.UNEXPECTED;
  }
}

export default function LoginHeader({ progress }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <Grid item>
        <CloudImage
          className={classes.logo}
          alt="logo extended"
          url="https://res.cloudinary.com/dlfbz4vzv/image/upload/v1618163769/Books/logo_extended_tzumtl."
        />
      </Grid>
      <Grid item>
        <Typography variant="body2">{renderText(progress)}</Typography>
      </Grid>
    </Grid>
  );
}
