import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const PLACEHOLDER_IMAGE_URL =
  'https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png';

const useStyles = makeStyles(() => ({
  picture: {
    width: '150px',
    height: '150px',
  },
}));

export default function ProfileHeader({ profile }) {
  const classes = useStyles();

  return (
    <Grid container justify="flex-start" alignItems="center" spacing={2}>
      <Grid item>
        <Avatar
          className={classes.picture}
          src={
            profile.profilePicture
              ? profile.profilePicture
              : PLACEHOLDER_IMAGE_URL
          }
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h5">
              <b>
                {profile.name} {profile.surname}
              </b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Ranked #1</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Booker since 2021</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
