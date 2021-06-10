import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VerticalRectangular from '../VerticalRectangular';

const useStyles = makeStyles((theme) => ({
  bookCover: {
    [theme.breakpoints.up('xs')]: {
      width: '53px',
      height: '80px',
    },
    [theme.breakpoints.up('md')]: {
      width: '66px',
      height: '100px',
    },
    boxShadow: `1px 1px 5px 1px ${theme.palette.custom.shadowGray}`,
    '&:hover': {
      // Old style -> outline: `3px solid ${theme.palette.primary.dark}`,
      boxShadow: `2px 2px 5px 2px ${theme.palette.custom.shadowGray}`,
    },
  },
}));

export default function BookCard(props) {
  const classes = useStyles();
  const { book } = props;

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Grid container justify="flex-start" alignItems="center" spacing={2}>
          <Grid item>
            <VerticalRectangular className={classes.bookCover}>
              <img src={book.pictures[0]} alt={`book cover of ${book.title}`} />
            </VerticalRectangular>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item>
                <Link
                  variant="body1"
                  color="inherit"
                  // Link disabled
                  onClick={(event) => event.preventDefault()}
                  href=""
                >
                  <b>{book.title}</b>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="body1">{book.isbn}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  The book is in <b>{book.condition}</b> condition
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          <b>{`${book.currency} ${book.amount}`}</b>
        </Typography>
      </Grid>
    </Grid>
  );
}
