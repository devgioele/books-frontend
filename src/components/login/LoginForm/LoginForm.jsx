import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { submitLogin } from 'api/auth';
import PasswordField from 'components/PasswordField';
import useAxios from 'hooks/axios';
import useStatefulSnackbar from 'hooks/snackbar';
import STD_MESSAGES from 'messages/standard';
import { useAuth } from 'hooks/auth';

const useStyles = makeStyles(() => ({
  textField: { width: '100%' },
  btn: { width: '100%' },
}));

export default function LoginForm({ redirect, usernameOrEmail }) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const auth = useAuth();
  const btnContinue = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [fetch, cancelPrevious, data, error] = useAxios(submitLogin);
  useStatefulSnackbar(
    error?.response?.status || error,
    STD_MESSAGES.UNEXPECTED,
    'error',
    401
  );
  useEffect(() => {
    if (error?.response?.status === 401) {
      setInvalid(true);
      setIsLoggingIn(false);
    }
  }, [error, setInvalid]);
  useEffect(() => {
    if (data !== null) {
      auth.login(data.token);
      redirect();
    }
  }, [data, auth, redirect]);

  const updatePassword = (event) => {
    setInvalid(false);
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoggingIn(true);
    fetch(usernameOrEmail, password);
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
        <PasswordField
          className={classes.textField}
          autoFocus={true}
          variant="outlined"
          size="small"
          label="Password"
          onChange={updatePassword}
          error={invalid}
        />
      </Grid>
      <Grid item>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          ref={btnContinue}
          onClick={handleSubmit}
          disabled={isLoggingIn}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
