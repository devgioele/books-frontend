import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Slide, useScrollTrigger } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { AUTH_ROUTE, toRoute } from '../../routing/helpers';

const useStyles = makeStyles(() => ({
  appBarBottomNavigation: {
    width: '100%',
  },
  appBarDrawer: (props) => ({
    width: `calc(100% - ${props.drawerWidth}px)`,
    marginLeft: props.drawerWidth,
  }),
}));

export default function DynamicAppBar({ title, variant, drawerWidth }) {
  const classes = useStyles({ drawerWidth });
  const scrollTriggerHide = useScrollTrigger({
    threshold: 200,
    disableHysteresis: true,
  });
  const scrollTriggerShadow = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });
  const auth = useAuth();

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
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <IconButton
            aria-label="logout"
            color="inherit"
            edge="end"
            onClick={logout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
