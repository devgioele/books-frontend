import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { submitSignup } from '../api/auth';

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

  const updateNewUser = (fieldName) => (event) => {
    setInvalid(false);
    setNewUser({ ...newUser, [fieldName]: event.target.value });
    // TODO: Delete this. setNewUser(Object.assign(newUser, { [fieldName]: event.target.value }));
  };

  const passwordNotConfirmed = newUser.password !== newUser.passwordConfirmed;

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
          value={newUser.password}
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
          value={newUser.passwordConfirmed}
          error={passwordNotConfirmed}
          helperText={passwordNotConfirmed ? 'Passwords do not match.' : ''}
          onChange={updateNewUser('passwordConfirmed')}
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() =>
            submitSignup(newUser, onSuccess, () => setInvalid(true))
          }
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
