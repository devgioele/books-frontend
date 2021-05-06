import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoginHeader from 'components/login/LoginHeader';
import { useHistory, useLocation } from 'react-router-dom';
import AuthForm from 'components/login/AuthForm';
import COMPILATION_PROGRESS from './authProgress';
import { EXPLORE_ROUTE } from '../../routing/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    textAlign: 'center',
  },
  loginCard: {
    [theme.breakpoints.up('xs')]: {
      borderRadius: 0,
      padding: '50px 5%',
      width: '100vw',
      height: '100vh',
    },
    [theme.breakpoints.up('smmd')]: {
      borderRadius: 20,
      width: '800px',
      height: '670px',
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
    height: '100%',
    minWidth: '280px',
  },
}));

export default function Authorization() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [progress, setProgress] = useState(COMPILATION_PROGRESS.IDENTITY);

  const redirect = () => {
    if (location.state && location.state.from)
      history.replace(location.state.from);
    else history.push(EXPLORE_ROUTE);
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
                  <AuthForm
                    progress={progress}
                    onProgress={setProgress}
                    redirect={redirect}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
