import React, { useState } from 'react';
import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoginHeader from 'components/LoginHeader';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
import axios from 'axios';
import RegexTextField from 'components/RegexTextField';
import COMPILATION_PROGRESS from './compilationProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    textAlign: 'center',
  },
  loginCard: {
    // margin: 'auto',

    [theme.breakpoints.up('xs')]: {
      borderRadius: 0,
      padding: '50px 5%',
      width: '100vw',
      height: '100vh',
    },
    [theme.breakpoints.up('smmd')]: {
      borderRadius: 20,
      width: '800px',
      height: '600px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '50px 25%',
    },
    // offset-x | offset-y | blur-radius | spread-radius
    boxShadow: `0px 1px 3px 0px ${theme.colors.shadowGray}`,
    '&:hover': {
      boxShadow: `0px 10px 25px -5px ${theme.colors.shadowGray}`,
    },
  },
  contentContainer: {
    margin: 'auto',
    width: '100%',
    minWidth: '280px',
    height: '100%',
  },
  textField: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
}));

function checkIdentity(credits, setProgress) {
  axios
    .post('/v1/auth/check', {
      usernameOrEmail: credits.username || credits.email,
    })
    .then((response) =>
      // TODO: Update with real response format
      setProgress(
        response.data === 'yes'
          ? COMPILATION_PROGRESS.LOGIN
          : COMPILATION_PROGRESS.SIGNUP
      )
    )
    .catch((error) => {
      console.log(error);
    });
}

function login(credits, redirect) {
  axios
    // TODO: Update with real endpoint
    .post('', {
      usernameOrEmail: credits.username || credits.email,
      password: credits.password,
    })
    .then((response) => {
      // TODO: Update with real response format
      if (response.data === 'yes') redirect();
    })
    .catch((error) => {
      console.log(error);
    });
}

function signup(credits, redirect) {
  axios
    // TODO: Update with real endpoint
    .post('', {
      username: credits.username,
      email: credits.email,
      password: credits.password,
    })
    .then((response) => {
      // TODO: Update with real response format
      if (response.data === 'yes') redirect();
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function Login() {
  const classes = useStyles();
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();
  const [progress, setProgress] = useState(COMPILATION_PROGRESS.IDENTIFICATION);
  const [credits, setCredits] = useState({});

  const redirect = () => auth.login(() => history.replace(location.state.from));

  const clickContinue = () => {
    switch (progress) {
      case COMPILATION_PROGRESS.IDENTIFICATION:
        checkIdentity(credits, setProgress);
        break;
      case COMPILATION_PROGRESS.LOGIN:
        login(credits, redirect);
        break;
      case COMPILATION_PROGRESS.SIGNUP:
        signup(credits, redirect);
        break;
      default:
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Paper className={classes.loginCard} variant="outlined">
          <Grid
            container
            className={classes.contentContainer}
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={8}
          >
            <Grid item>
              <LoginHeader progress={progress} />
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                <Grid item>
                  <RegexTextField
                    className={classes.textField}
                    size="small"
                    label="Username or email"
                    onChange={setCredits}
                    regexes={{
                      email: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/g,
                      username: /^\w\w\w+$/g,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={clickContinue}
                    // If both are undefined
                    disabled={(credits.username || credits.email) === undefined}
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
