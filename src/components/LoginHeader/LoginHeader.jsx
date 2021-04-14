import Grid from '@material-ui/core/Grid';
import CloudImage from 'components/CloudImage';
import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  logo: {
    minWidth: '125px',
    width: 'auto',
    height: '80px',
  },
}));

export default function LoginHeader() {
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
        <Typography variant="body2">
          {`We will log you in or create an account if you don't have one already.`}
        </Typography>
      </Grid>
    </Grid>
  );
}
