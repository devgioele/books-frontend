import React, { useState } from 'react';
import { Avatar, CircularProgress, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileTypography from 'components/profile/ProfileTypography';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import { useHistory } from 'react-router-dom';
import { EDIT_PROFILE_ROUTE, toRoute } from '../../../routing/helpers';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '150px',
    height: '150px',
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.divider,
    height: '60px',
    width: '60px',
  },
}));

export default function ProfileHeader({ fields }) {
  const classes = useStyles();
  const [mouseOnAvatar, setMouseOnAvatar] = useState(false);
  const history = useHistory();

  const [username, name, surname, picture] = fields;

  return (
    <Grid container justify="flex-start" alignItems="center" spacing={2}>
      <Grid item>
        <Avatar
          className={classes.avatar}
          src={picture.data}
          onMouseOver={() => setMouseOnAvatar(true)}
          onMouseLeave={() => setMouseOnAvatar(false)}
          onClick={() => history.push(toRoute(EDIT_PROFILE_ROUTE))}
        >
          {mouseOnAvatar ? (
            <AddPhotoIcon className={classes.icon} alt="Profile photo" />
          ) : undefined}
        </Avatar>
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
            <Typography variant="h6">@{username.data}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
