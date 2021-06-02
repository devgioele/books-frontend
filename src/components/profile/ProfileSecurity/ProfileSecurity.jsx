import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useAxios } from '../../../hooks/axios';
import { changePassword } from '../../../api/auth';
import PasswordField from '../../PasswordField';

export default function ProfileSecurity() {
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
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <PasswordField
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
              startIcon={<EditIcon />}
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
