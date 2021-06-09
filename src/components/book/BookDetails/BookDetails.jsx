import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bookTitle: {
    fontWeight: 'bold',
  },
}));

export default function BookDetails({ book }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.bookTitle} variant="h4">
              {book.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.bookTitle} variant="h6">
              {book.currency} {book.amount}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{book.isbn}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">
              This book is in <b>{book.condition}</b> condition
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{book.description}</Typography>
      </Grid>
    </Grid>
  );
}
