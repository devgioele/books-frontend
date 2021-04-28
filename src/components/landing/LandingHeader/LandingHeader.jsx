import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudImage from 'components/CloudImage';
import { useHistory } from 'react-router-dom';
import { EXPLORE_ROUTE } from 'routing/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexWrap: 'wrap',
  },
  logo: {
    height: '60px',
  },
  button: {
    fontFamily: theme.typography.body1.fontFamily,
  },
}));

export default function LandingHeader() {
  const classes = useStyles();
  const history = useHistory();

  const changePage = (route) => {
    history.push(route);
  };

  return (
    <Grid
      className={classes.root}
      container
      direction='row'
      justify='space-between'
      alignItems='center'
      spacing={2}
    >
      <Grid item xs={6}>
        <CloudImage
          className={classes.logo}
          alt='logo extended'
          url='https://res.cloudinary.com/dlfbz4vzv/image/upload/v1618163769/Books/logo_extended_tzumtl.'
        />
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              className={classes.button}
              variant='outlined'
              color='default'
              onClick={() => changePage(EXPLORE_ROUTE)}
            >
              Log in
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => changePage(EXPLORE_ROUTE)}
            >
              Sign up for free
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
