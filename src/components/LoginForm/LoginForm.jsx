import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { BASE_URL } from 'routing/helpers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textField: { width: '100%' },
  btn: { width: '100%' },
}));

export default function LoginForm({ onSuccess, usernameOrEmail }) {
  const classes = useStyles();
  const [password, setPassword] = useState();
  const [invalid, setInvalid] = useState(false);

  const submit = () => {
    axios
      // Submit username and password
      .post(`${BASE_URL}/auth/login`, { usernameOrEmail, password })
      // If correct, redirect using onSuccess
      .then((response) => {
        if (response.status === 200) onSuccess();
        else throw new Error(`Unexpected response: ${response.status}!`);
      })
      // Report error
      .catch((error) => {
        if (error.response?.status === 422) setInvalid(true);
        else throw error;
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
          variant="outlined"
          color="secondary"
          size="small"
          label="Password"
          onChange={(event) => {
            setInvalid(false);
            setPassword(event.target.value);
          }}
          error={invalid}
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
