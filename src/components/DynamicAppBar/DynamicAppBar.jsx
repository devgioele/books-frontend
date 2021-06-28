import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Slide, useScrollTrigger } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from 'hooks/auth';
import { useHistory } from 'react-router-dom';
import { ExitToAppRounded } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  appBarBottomNavigation: {
    width: '100%',
  },
  appBarDrawer: (props) => ({
    width: `calc(100% - ${props.drawerWidth}px)`,
    marginLeft: props.drawerWidth,
  }),
  appBarTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    textOverflow: 'ellipsis',
    width: '100%',
  },
}));

export default function DynamicAppBar({
  title,
  variant,
  drawerWidth,
  showBack,
}) {
  const classes = useStyles({ drawerWidth });
  const scrollTriggerHide = useScrollTrigger({
    threshold: 200,
    disableHysteresis: true,
  });
  const scrollTriggerShadow = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });
  const history = useHistory();
  const auth = useAuth();

  const goBack = () => {
    history.goBack();
  };

  const logout = () => {
    auth.logout();
  };

  return (
    <Slide appear={false} direction="down" in={!scrollTriggerHide}>
      <AppBar
        position="fixed"
        className={
          variant === 'drawer'
            ? classes.appBarDrawer
            : classes.appBarBottomNavigation
        }
        elevation={scrollTriggerShadow ? 4 : 0}
      >
        <Toolbar>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={10}>
              <Grid container alignItems="center" spacing={2}>
                {showBack && (
                  <Grid item xs={1}>
                    <Grid container justify="center">
                      <IconButton
                        aria-label="go back"
                        color="inherit"
                        onClick={goBack}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={10}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="h6" className={classes.appBarTitle}>
                      {title}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <Grid container justify="center">
                <IconButton
                  aria-label="logout"
                  color="inherit"
                  onClick={logout}
                >
                  <ExitToAppRounded />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
