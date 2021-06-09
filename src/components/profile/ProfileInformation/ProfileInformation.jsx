import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import ProfileTypography from 'components/profile/ProfileTypography';
import { EDIT_PROFILE_ROUTE, toRoute } from 'routing/helpers';

export default function ProfileInformation({ fields }) {
  const history = useHistory();

  const openEditDialog = () => {
    history.push(toRoute(EDIT_PROFILE_ROUTE));
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4">
              <b>Personal information</b>
            </Typography>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              disableElevation={true}
              startIcon={<EditIcon />}
              onClick={openEditDialog}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {fields.map((field, index) => (
        <Grid key={index} item>
          <Typography variant="h6">
            <b>{field.displayName}</b>
          </Typography>
          <ProfileTypography
            text={field.data}
            show={field.data}
            successVariant="body1"
          />
        </Grid>
      ))}
    </Grid>
  );
}
