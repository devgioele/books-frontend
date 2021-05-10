import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { getFromObject } from '../../../utils/functions';

const fields = [
  {
    title: 'Email',
    value: 'email',
  },
  {
    title: 'Phone Number',
    value: 'contactInformation.phoneNumber',
  },
  {
    title: 'Telegram',
    value: 'contactInformation.telegramUsername',
  },
  {
    title: 'Facebook',
    value: 'contactInformation.facebookUsername',
  },
];

export default function ProfileInformation({ profile }) {
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
          <Typography variant="body1">
            {getFromObject(profile, field.value)}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
