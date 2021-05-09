import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import BooksAppBar from '../BooksAppBar';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // Necessary for content to be below app bar
  toolbarPlaceholder: theme.mixins.toolbar,
  contentContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  content: {
    padding: theme.spacing(3),
  },
}));

export default function DrawerLeft({
  title,
  content,
  selectedSection,
  sections,
  changeSection,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BooksAppBar title={title} variant="drawer" drawerWidth={drawerWidth} />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbarPlaceholder} />
        <Divider />
        <List>
          {sections.map((section) => (
            <ListItem
              button
              key={section.label}
              selected={section === selectedSection}
              onClick={() => changeSection(section.route)}
            >
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.contentContainer}>
        <div className={classes.toolbarPlaceholder} />
        <main className={classes.content}>{content}</main>
      </div>
    </div>
  );
}
