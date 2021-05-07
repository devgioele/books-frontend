import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  appBar: {
    width: '100%',
  },
  contentContainer: {
    height: '100vh',
    // display: 'flex',
    // flexDirection: 'column',
    // flexWrap: 'nowrap',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  // Necessary for content to be below toolbar
  toolbarPlaceholder: theme.mixins.toolbar,
  // Necessary for content to be above navigator
  navigatorPlaceholder: theme.mixins.navigator,
  content: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    // flexGrow: 1,
    // flexShrink: 1,
    // alignSelf: 'flex-start',
  },
  navigator: {
    height: theme.mixins.navigator,
    background: theme.palette.background.default,
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}));

export default function SimpleBottomNavigation({
  title,
  content,
  selectedIndex,
  sections,
  changeSection,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.contentContainer}>
        <div className={classes.toolbarPlaceholder} />
        <main className={classes.content}>{content}</main>
        {/* TODO: The navigator placeholder is placed wrongly. */}
        <div className={classes.navigatorPlaceholder} />
      </div>
      <BottomNavigation
        className={classes.navigator}
        value={selectedIndex}
        onChange={(event, newIndex) => {
          changeSection(sections[newIndex].route);
        }}
        showLabels
      >
        {sections.map((section) => (
          <BottomNavigationAction
            key={section.label}
            label={section.label}
            icon={section.icon}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}
