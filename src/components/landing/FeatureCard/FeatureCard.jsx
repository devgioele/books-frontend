import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    position: 'static',
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function FeatureCard({ icon, title, description }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Avatar className={classes.avatar}>{icon}</Avatar>
      </Grid>
      <Grid item>
        <Typography variant="h5" align="center">
          <b>{title}</b>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center">
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
}
