import React from 'react';
import {
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  withStyles,
} from '@material-ui/core';
import { Player } from '@lottiefiles/react-lottie-player';
import profilePasswordUnlock from 'animations/profile-password-unlock.json';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  animation: {
    height: '200px',
  },
  animationSmall: {
    height: '150px',
  },
}));

export default function CompleteProfileBanner({ progress }) {
  const classes = useStyles();
  const downSmall = useMediaQuery((theme) =>
    theme.breakpoints.down(theme.breakpoints.values.sm)
  );

  return (
    <Paper className={classes.card} variant="outlined">
      <Grid
        container
        direction={downSmall ? 'column' : 'row'}
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={4}>
          <div
            className={clsx(
              classes.animation,
              downSmall && classes.animationSmall
            )}
          >
            <Player
              className={clsx(
                classes.animation,
                downSmall && classes.animationSmall
              )}
              style={!downSmall && { marginLeft: '-20%' }}
              autoplay
              loop
              keepLastFrame
              src={profilePasswordUnlock}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="h6">
                <b>Complete your profile</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Did you know that having a complete profile greatly increases
                the chances of selling books? Your profile is now {progress}%
                completed. Just a few finishing touches!
              </Typography>
            </Grid>
            <Grid item>
              <CustomLinearProgress value={progress} variant="determinate" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

const CustomLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
  },
}))(LinearProgress);
