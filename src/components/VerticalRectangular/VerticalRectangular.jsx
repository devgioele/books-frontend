import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  child: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function VerticalRectangular({ children, className }) {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        {/* Inject props */}
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            className: clsx(classes.child, className),
            style: { borderRadius: 5 },
          })
        )}
      </Grid>
    </Grid>
  );
}
