import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { submitIdentity } from 'api/auth';
import useStatefulSnackbar from 'hooks/snackbar';
import useAxios from 'hooks/axios';
import STD_MESSAGES from 'messages/standard';

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
  const [fetch, cancelPrevious, data, error] = useAxios(submitIdentity);
  useStatefulSnackbar(error, STD_MESSAGES.UNEXPECTED, 'error');
  useEffect(() => {
    if (data !== null) onProgress(data);
  }, [onProgress, data]);

  const handleSubmit = () => {
    cancelPrevious();
    fetch(usernameOrEmail);
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
