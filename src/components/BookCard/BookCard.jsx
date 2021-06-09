import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VerticalRectangular from '../VerticalRectangular';

const useStyles = makeStyles((theme) => ({
  bookCover: {
    [theme.breakpoints.up('xs')]: {
      width: '50px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70px',
    },
    height: 'auto',
    objectFit: 'scale-down',
    borderRadius: 5,
    boxShadow: `1px 1px 5px 1px ${theme.palette.custom.shadowGray}`,
    '&:hover': {
      outline: `3px solid ${theme.palette.primary.dark}`,
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
              <img src={book.pictures[0]} alt="book cover" />
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
                <Typography variant="body2">{book.isbn}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{book.condition}</Typography>
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
