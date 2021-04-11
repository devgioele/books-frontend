import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, useMediaQuery } from '@material-ui/core';
import CloudImage from 'components/CloudImage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexWrap: 'wrap',
    [theme.breakpoints.up('smmd')]: {
      flexWrap: 'nowrap',
    },
  },
  illustrationContainer: {
    textAlign: 'right',
  },
  illustration: {
    minWidth: '200px',
    maxWidth: '430px',
    width: '100%',
    height: 'auto',
  },
  welcomeMsg: {
    minWidth: '100px',
    width: '100%',
  },
}));

export default function LandingWelcome() {
  const classes = useStyles();
  const upSmallMedium = useMediaQuery((theme) => theme.breakpoints.up('smmd'));

  return (
    <Grid
      className={classes.root}
      container
      spacing={2}
      direction={upSmallMedium ? 'row' : 'column'}
      justify={upSmallMedium ? 'space-between' : 'center'}
      alignItems={upSmallMedium ? 'center' : 'stretch'}
    >
      <Grid item>
        <Grid
          className={classes.welcomeMsg}
          container
          spacing={2}
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography variant="h3">
              Welcome to <b>Books</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              Discover and sell amazing books with ease.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.illustrationContainer}>
        <CloudImage
          className={classes.illustration}
          alt="student library"
          url="https://res.cloudinary.com/dlfbz4vzv/image/upload/v1618163769/Books/student_library_rymenl."
        />
      </Grid>
    </Grid>
  );
}
