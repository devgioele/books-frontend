import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Slide, useScrollTrigger } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from 'hooks/auth';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  appBarBottomNavigation: {
    width: '100%',
  },
  appBarDrawer: (props) => ({
    width: `calc(100% - ${props.drawerWidth}px)`,
    marginLeft: props.drawerWidth,
  }),
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
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                {showBack && (
                  <Grid item>
                    <IconButton
                      aria-label="go back"
                      color="inherit"
                      onClick={goBack}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </Grid>
                )}
                <Grid item>
                  <Typography variant="h6" noWrap>
                    {title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <IconButton aria-label="logout" color="inherit" onClick={logout}>
                <ExitToAppIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
