import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import { useAxios } from '../../../hooks/axios';
import { changePassword } from '../../../api/auth';
import PasswordField from '../../PasswordField';

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    marginBottom: theme.spacing(1),
  },
}));

export default function ProfileSecurity() {
  const classes = useStyles();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [
    fChangePassword,
    cChangePassword,
    ,
    changePasswordError,
    isChangingPassword,
  ] = useAxios(changePassword, 'changePassword', () => {
    setOldPassword('');
    setNewPassword('');
  });

  const change = () => {
    cChangePassword();
    fChangePassword(oldPassword, newPassword);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          <b>Security</b>
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.sectionTitle} variant="h6">
          <b>Change your password</b>
        </Typography>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <PasswordField
              color="secondary"
              variant="outlined"
              size="small"
              label="Old password"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
              error={changePasswordError}
            />
          </Grid>
          <Grid item>
            <PasswordField
              color="secondary"
              variant="outlined"
              size="small"
              label="New password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              error={changePasswordError}
            />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              disableElevation={true}
              startIcon={<LockIcon />}
              disabled={isChangingPassword}
              onClick={change}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
