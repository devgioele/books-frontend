import { Button, TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { submitSignup } from '../api/auth';
import PasswordField from '../PasswordField';

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
  const btnContinue = useRef(null);

  const isEmail = exactMatch(
    usernameOrEmail,
    /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  );
  const initEmail = isEmail ? usernameOrEmail : '';
  const isUsername = !isEmail && exactMatch(usernameOrEmail, /\w\w\w+/g);
  const initUsername = isUsername ? usernameOrEmail : '';

  const [newUser, setNewUser] = useState({
    email: initEmail,
    username: initUsername,
    password: '',
    passwordConfirmed: '',
  });

  const updateNewUser = (fieldName) => (event) => {
    setInvalid(false);
    setNewUser({ ...newUser, [fieldName]: event.target.value });
  };

  const passwordConfirmed = newUser.password === newUser.passwordConfirmed;

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
          required
          autoFocus={true}
          defaultValue={initEmail}
          id="email"
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
          defaultValue={initUsername}
          id="username"
          variant="outlined"
          color="secondary"
          size="small"
          label="Username"
          error={invalid}
          onChange={updateNewUser('username')}
        />
      </Grid>
      <Grid item>
        <PasswordField
          className={classes.textField}
          required
          id="password"
          variant="outlined"
          color="secondary"
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
          required
          id="passwordConfirmed"
          variant="outlined"
          color="secondary"
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
          onClick={() => {
            if (passwordConfirmed)
              submitSignup(newUser, onSuccess, () => setInvalid(true));
          }}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
