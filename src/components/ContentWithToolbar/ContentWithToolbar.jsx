import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbarPlaceholder: theme.mixins.toolbar,
  contentContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  content: {
    padding: theme.spacing(3),
  },
}));

export default function ContentWithToolbar({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.contentContainer}>
      <div className={classes.toolbarPlaceholder} />
      <main className={classes.content}>{children}</main>
    </div>
  );
}
