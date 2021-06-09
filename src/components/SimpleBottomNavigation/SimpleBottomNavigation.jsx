import React from 'react';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DynamicAppBar from 'components/DynamicAppBar';
import ContentWithToolbar from 'components/ContentWithToolbar';
import { createMuiTheme } from '@material-ui/core';
import theme from 'theming';

const navTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.palette.secondary.main,
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  navigator: {
    background: theme.palette.background.default,
    /*
    We use viewport width instead of page width, because the page includes
    the scroll bar, which is not always visible.
    We don't want this width to change when the scrollbar appears.
     */
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    // offset-x | offset-y | blur-radius | spread-radius
    boxShadow: `0px 0px 5px 2px ${theme.palette.shadowGray}`,
    // Necessary for content to be above navigator
    ...theme.mixins.navigator,
  },
  // actionRoot: {
  //   color: 'green',
  //   '&$selected': {
  //     color: 'red',
  //   },
  // },
  // actionSelected: {
  //   color: 'red',
  //   '&$selected': {
  //     color: 'red',
  //   },
  // },
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
      <DynamicAppBar title={title} variant="bottomNavigation" />
      <ContentWithToolbar>{content}</ContentWithToolbar>
      <MuiThemeProvider theme={navTheme}>
        <BottomNavigation
          className={classes.navigator}
          value={selectedIndex}
          onChange={(event, newIndex) =>
            changeSection(sections[newIndex].route)
          }
        >
          {sections.map((section) => (
            <BottomNavigationAction
              key={section.label}
              label={section.label}
              icon={section.icon}
              // classes={{
              //   root: classes.actionRoot,
              //   selected: classes.actionSelected,
              // }}
            />
          ))}
        </BottomNavigation>
      </MuiThemeProvider>
    </div>
  );
}
