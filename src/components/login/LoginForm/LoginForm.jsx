import React, { useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { login } from 'api/auth';
import PasswordField from 'components/PasswordField';
import { useAxios } from 'hooks/axios';
import { useAuth } from 'hooks/auth';

const useStyles = makeStyles(() => ({
  textField: { width: '100%' },
  btn: { width: '100%' },
}));

export default function LoginForm({ redirect, usernameOrEmail }) {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);
  const auth = useAuth();
  const btnContinue = useRef(null);

  const [fetch, , , , isLoading] = useAxios(
    login,
    'logging in',
    (fetchedData) => {
      auth.login(fetchedData.token);
      redirect();
    },
    () => setInvalid(true)
  );

  const updatePassword = (event) => {
    setInvalid(false);
    setPassword(event.target.value);
  };

  const handleSubmit = () => fetch(usernameOrEmail, password);
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
          disabled={isLoading}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
