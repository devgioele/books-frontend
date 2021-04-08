import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WebImg from 'components/WebImg';
import logoExtendedAvif from 'assets/logo_extended.avif';
import logoExtendedWebp from 'assets/logo_extended.webp';
import logoExtendedJp2 from 'assets/logo_extended.jp2';
import logoExtendedJxr from 'assets/logo_extended.jxr';
import { useHistory } from "react-router-dom";
import {
  EXPLORE_ROUTE,
  SIGNUP_ROUTE
} from "../../routing/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexWrap: 'wrap',
  },
  logo: {
    minWidth: '125px',
    width: 'auto',
    height: '60px',
  },
  button: {
    fontFamily: theme.typography.body1.fontFamily
  },
}));

export default function LandingHeader() {
  const classes = useStyles();
  const history = useHistory();

  const changePage = (route) => {
    history.push(route);
  }

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={6}>
        <WebImg
          className={classes.logo}
          alt="logo extended"
          avif={logoExtendedAvif}
          webp={logoExtendedWebp}
          jp2={logoExtendedJp2}
          jxr={logoExtendedJxr}
        />
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              className={classes.button}
              variant="outlined"
              color="default"
              onClick={() => changePage(EXPLORE_ROUTE)}>
              Log in
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => changePage(SIGNUP_ROUTE)}>
              Sign up for free
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
