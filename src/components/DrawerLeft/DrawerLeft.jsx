import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import DynamicAppBar from 'components/DynamicAppBar';
import ContentWithToolbar from 'components/ContentWithToolbar';
import CloudImage from 'components/CloudImage';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

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
  toolbarPlaceholder: theme.mixins.toolbarDrawer,
  logo: { height: '100%' },
  selectedSection: {
    color: theme.palette.secondary.main,
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
      <DynamicAppBar title={title} variant="drawer" drawerWidth={drawerWidth} />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={clsx(classes.toolbarPlaceholder)}>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            style={{ height: '100%', marginLeft: '6px' }}
          >
            <Grid item style={{ height: '90%' }}>
              <CloudImage
                className={classes.logo}
                alt="logo extended"
                url="https://res.cloudinary.com/dlfbz4vzv/image/upload/v1618163769/Books/logo_extended_tzumtl."
              />
            </Grid>
          </Grid>
        </div>
        <Divider />
        <List>
          {sections.map((section) => (
            <ListItem
              button
              className={section === selectedSection && classes.selectedSection}
              key={section.label}
              selected={section === selectedSection}
              onClick={() => changeSection(section.route)}
            >
              <ListItemIcon
                className={
                  section === selectedSection && classes.selectedSection
                }
              >
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <ContentWithToolbar>{content}</ContentWithToolbar>
    </div>
  );
}
