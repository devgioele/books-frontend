import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5,
  },
  item: {
    height: 'auto',
    margin: 5,
  },
  childWrapper: {
    borderRadius: 5,
  },
  child: {
    width: '100%',
    height: '100%',
    objectFit: 'scale-down',
    verticalAlign: 'middle',
  },
}));

export default function VerticalRectangular({ children, className }) {
  const classes = useStyles();

  return (
    <Grid
      container
      className={clsx(classes.container, className)}
      justify="center"
      alignItems="center"
    >
      <Grid item className={classes.item}>
        <div className={classes.childWrapper}>
          {/* Inject props */}
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              className: classes.child,
              style: { borderRadius: 5 },
            })
          )}
        </div>
      </Grid>
    </Grid>
  );
}
