import React from 'react';
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { BASE_URL } from 'routing/helpers';
import AuthProgress from 'screens/Login/authProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textField: { width: '100%' },
  btn: { width: '100%' },
}));

export default function IdentityForm({
  onProgress,
  usernameOrEmail,
  setUsernameOrEmail,
}) {
  const classes = useStyles();

  const submit = () => {
    // Submit username or email and change auth progress according to whether
    // it exists.
    axios
      .post(`${BASE_URL}/auth/check`, { usernameOrEmail })
      .then((response) => {
        if (response.status === 200) {
          onProgress(AuthProgress.LOGIN);
        } else throw new Error(`Unexpected response: ${response.status}!`);
      })
      .catch((error) => {
        if (error.response?.status === 500) {
          onProgress(AuthProgress.SIGNUP);
        } else throw error;
      });
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <Grid item>
        <TextField
          className={classes.textField}
          size="small"
          label="Username or email"
          variant="outlined"
          color="secondary"
          onChange={(event) => setUsernameOrEmail(event.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={submit}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
