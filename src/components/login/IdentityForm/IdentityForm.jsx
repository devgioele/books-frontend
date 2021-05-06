import React, { useRef, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { checkIdentity } from 'api/auth';
import useAxios from 'hooks/axios';
import AuthProgress from 'screens/Authorization/authProgress';

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
  const [invalid, setInvalid] = useState(false);
  const btnContinue = useRef(null);
  const [doCheckIdentity, cancelCheckIdentity, ,] = useAxios(
    checkIdentity,
    'verifying existence of user',
    (fetchedData) => {
      if (fetchedData.username) onProgress(AuthProgress.LOGIN);
      else onProgress(AuthProgress.SIGNUP);
    },
    () => setInvalid(true)
  );

  const handleSubmit = () => {
    cancelCheckIdentity();
    doCheckIdentity(usernameOrEmail);
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
          size="small"
          label="Username or email"
          variant="outlined"
          onChange={(event) => {
            setInvalid(false);
            setUsernameOrEmail(event.target.value);
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
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
