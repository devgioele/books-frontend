import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { BASE_URL } from '../../routing/helpers';

const useStyles = makeStyles(() => ({
  textField: { width: '100%' },
  btn: { width: '100%' },
}));

function exactMatch(text, regex) {
  const matches = text.match(regex);
  return matches?.length === 1;
}

export default function SignupForm({ onSuccess, usernameOrEmail }) {
  const classes = useStyles();
  const [invalid, setInvalid] = useState(false);

  const isEmail = exactMatch(
    usernameOrEmail,
    /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  );
  const isUsername = !isEmail && exactMatch(usernameOrEmail, /\w\w\w+/g);

  const [newUser, setNewUser] = useState({
    email: isEmail ? usernameOrEmail : '',
    username: isUsername ? usernameOrEmail : '',
    password: '',
    passwordConfirmed: '',
  });

  const submit = () => {
    axios
      // Submit new user data
      .post(`${BASE_URL}/auth/signup`, {
        username: newUser.username,
        password: newUser.password,
        contactInformation: {
          email: newUser.email,
        },
      })
      // If successfully signed up, redirect using onSuccess
      .then((response) => {
        if (response.status === 302) onSuccess();
        else throw new Error(`Unexpected response: ${response.status}!`);
      })
      // Report error
      .catch((error) => {
        if (error.response?.status === 422) setInvalid(true);
        else throw error;
      });
  };

  const updateNewUser = (fieldName) => (event) => {
    setInvalid(false);
    setNewUser(Object.assign(newUser, { [fieldName]: event.target.value }));
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
          required
          id="outlined-basic"
          variant="outlined"
          color="secondary"
          size="small"
          label="Email"
          error={invalid}
          onChange={updateNewUser('email')}
        />
      </Grid>
      <Grid item>
        <TextField
          className={classes.textField}
          required
          id="outlined-basic"
          variant="outlined"
          color="secondary"
          size="small"
          label="Username"
          error={invalid}
          onChange={updateNewUser('username')}
        />
      </Grid>
      <Grid item>
        <TextField
          className={classes.textField}
          required
          id="outlined-basic"
          variant="outlined"
          color="secondary"
          size="small"
          label="Password"
          error={invalid}
          onChange={updateNewUser('password')}
        />
      </Grid>
      <Grid item>
        <TextField
          className={classes.textField}
          required
          id="outlined-basic"
          variant="outlined"
          color="secondary"
          size="small"
          label="Confirm password"
          error={newUser.password !== newUser.passwordConfirmed}
          onChange={updateNewUser('passwordConfirmed')}
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
