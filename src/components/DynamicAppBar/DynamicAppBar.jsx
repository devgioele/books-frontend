import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Slide, useScrollTrigger } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
