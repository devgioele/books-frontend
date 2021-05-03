import { Button, TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { signup } from 'api/auth';
import PasswordField from 'components/PasswordField';
import useAxios from 'hooks/axios';

const useStyles = makeStyles(() => ({
  textField: { width: '100%' },
  btn: { width: '100%' },
}));

function exactMatch(text, regex) {
  const matches = text.match(regex);
  return matches && matches.length ? matches[0].length === text.length : false;
}

export default function SignupForm({ redirect, usernameOrEmail }) {
  const classes = useStyles();
  const [invalid, setInvalid] = useState(false);
  const btnContinue = useRef(null);

  const isEmail = exactMatch(
    usernameOrEmail,
    /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  );
  const initEmail = isEmail ? usernameOrEmail : '';
  const isUsername = !isEmail && exactMatch(usernameOrEmail, /\w+/g);
  const initUsername = isUsername ? usernameOrEmail : '';
  const [newUser, setNewUser] = useState({
    email: initEmail,
    username: initUsername,
    password: '',
    passwordConfirmed: '',
  });
  const updateNewUser = (fieldName) => (event) => {
    setInvalid(false);
    setNewUser({
      ...newUser,
      [fieldName]: event.target.value,
    });
  };
  const passwordConfirmed = newUser.password === newUser.passwordConfirmed;

  const [fetch, cancelPrevious, data, error] = useAxios(
    signup,
    'signing up',
    () => redirect,
    [422],
    () => setInvalid(true)
  );

  const handleSubmit = () => {
    if (passwordConfirmed) {
      cancelPrevious();
      fetch(newUser);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={2}
      onKeyPress={(e) => {
        if (e.key === 'Enter') btnContinue.current.click();
      }}
    >
      <Grid item>
        <TextField
          className={classes.textField}
          autoFocus={true}
          defaultValue={initEmail}
          id="email"
          variant="outlined"
          size="small"
          label="Email"
          error={invalid}
          onChange={updateNewUser('email')}
        />
      </Grid>
      <Grid item>
        <TextField
          className={classes.textField}
          defaultValue={initUsername}
          id="username"
          variant="outlined"
          size="small"
          label="Username"
          error={invalid}
          onChange={updateNewUser('username')}
          helperText="At least 3 characters"
        />
      </Grid>
      <Grid item>
        <PasswordField
          className={classes.textField}
          id="password"
          variant="outlined"
          size="small"
          label="Password"
          value={newUser.password}
          error={invalid}
          onChange={updateNewUser('password')}
        />
      </Grid>
      <Grid item>
        <PasswordField
          className={classes.textField}
          id="passwordConfirmed"
          variant="outlined"
          size="small"
          label="Confirm password"
          value={newUser.passwordConfirmed}
          error={!passwordConfirmed}
          helperText={passwordConfirmed ? '' : 'Passwords do not match.'}
          onChange={updateNewUser('passwordConfirmed')}
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          ref={btnContinue}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
