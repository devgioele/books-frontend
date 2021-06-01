import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import DynamicAppBar from '../DynamicAppBar';
import ContentWithToolbar from '../ContentWithToolbar';

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
  toolbarPlaceholder: theme.mixins.toolbar,
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
      <DynamicAppBar title={title} variant="drawer" drawerWidth={drawerWidth} />
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
      <ContentWithToolbar>{content}</ContentWithToolbar>
    </div>
  );
}
