import React, { useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { submitLogin } from '../../api/auth';
import PasswordField from '../../PasswordField';

const useStyles = makeStyles(() => ({
  textField: { width: '100%' },
  btn: { width: '100%' },
}));

export default function LoginForm({ onSuccess, usernameOrEmail }) {
  const classes = useStyles();
  const [password, setPassword] = useState();
  const [invalid, setInvalid] = useState(false);
  const btnContinue = useRef(null);

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
          ref={btnContinue}
          onClick={() =>
            submitLogin(
              onSuccess,
              () => setInvalid(true),
              usernameOrEmail,
              password
            )
          }
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
