import React from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LoginHeader from 'components/LoginHeader';

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

export default function Signup() {
  const classes = useStyles();

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
              <LoginHeader />
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
                  <TextField
                    required
                    className={classes.textField}
                    size="small"
                    id="outlined-basic"
                    label="Email or username"
                    variant="outlined"
                    color="secondary"
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
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
