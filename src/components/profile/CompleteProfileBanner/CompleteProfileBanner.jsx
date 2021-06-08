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

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
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
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={4}>
          <Player
            autoplay
            loop
            keepLastFrame
            src={profilePasswordUnlock}
            style={downSmall ? { height: '150px' } : { height: '200px' }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
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
