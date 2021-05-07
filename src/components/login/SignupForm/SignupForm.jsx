import { Button, TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { signup } from 'api/auth';
import PasswordField from 'components/PasswordField';
import useAxios from 'hooks/axios';

function exactMatch(text, regex) {
  const matches = text.match(regex);
  return matches && matches.length ? matches[0].length === text.length : false;
}

export default function SignupForm({ redirect, usernameOrEmail }) {
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

  const [doSignup, cancelSignup] = useAxios(
    signup,
    'signing up',
    () => redirect(),
    () => setInvalid(true)
  );

  const handleSubmit = () => {
    if (passwordConfirmed) {
      cancelSignup();
      doSignup(newUser);
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
          fullWidth
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
          fullWidth
          defaultValue={initUsername}
          id="username"
          variant="outlined"
          size="small"
          label="Username"
          helperText="At least 3 characters long"
          error={invalid}
          onChange={updateNewUser('username')}
        />
      </Grid>
      <Grid item>
        <PasswordField
          fullWidth
          id="password"
          variant="outlined"
          size="small"
          label="Password"
          helperText="At least 7 characters long"
          value={newUser.password}
          error={invalid}
          onChange={updateNewUser('password')}
        />
      </Grid>
      <Grid item>
        <PasswordField
          fullWidth
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
          fullWidth
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
