import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { getFromObject } from '../../../utils/functions';
import ProfileTypography from '../ProfileTypography';
import CompleteProfileBanner from '../CompleteProfileBanner';

export default function ProfileInformation({ fields }) {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          <b>Personal Information</b>
        </Typography>
      </Grid>
      {fields.map((field, index) => (
        <Grid key={index} item>
          <Typography variant="h6">
            <b>{field.title}</b>
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
