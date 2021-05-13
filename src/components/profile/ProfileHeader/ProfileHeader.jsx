import React from 'react';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileTypography from '../ProfileTypography';

const useStyles = makeStyles(() => ({
  picture: {
    width: '150px',
    height: '150px',
  },
}));

export default function ProfileHeader({ fields }) {
  const classes = useStyles();

  const [name, surname, picture] = fields;

  return (
    <Grid container justify="flex-start" alignItems="center" spacing={2}>
      <Grid item>
        <Avatar className={classes.picture} src={picture.data} />
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
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <ProfileTypography
                  text={name.data}
                  errorText="Missing name"
                  show={name.data}
                  successVariant="h5"
                  errorVariant="h6"
                />
              </Grid>
              <Grid item>
                <ProfileTypography
                  text={surname.data}
                  errorText="Missing surname"
                  show={surname.data}
                  successVariant="h5"
                  errorVariant="h6"
                />
              </Grid>
            </Grid>
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
