import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { BOOK_ROUTE, toRoute } from 'routing/helpers';
import { useHistory } from 'react-router-dom';
import VerticalRectangular from 'components/VerticalRectangular';

const useStyles = makeStyles((theme) => ({
  bookCover: {
    [theme.breakpoints.up('xs')]: {
      width: '100px',
      height: '150px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '133px',
      height: '200px',
    },
    boxShadow: `1px 1px 5px 1px ${theme.palette.custom.shadowGray}`,
    '&:hover': {
      boxShadow: `3px 3px 15px 3px ${theme.palette.custom.shadowGray}`,
    },
  },
  bookTitle: {
    [theme.breakpoints.up('xs')]: {
      width: '100px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '150px',
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  bookPrice: {
    fontWeight: 'normal',
  },
}));

export default function BooksGallery({ books }) {
  return (
    <Grid container spacing={3}>
      {books?.map((book, index) => (
        <Grid key={index} item>
          <Book book={book} />
        </Grid>
      ))}
    </Grid>
  );
}

function Book({ book }) {
  const classes = useStyles();
  const history = useHistory();
  const openBook = () => history.push(toRoute(BOOK_ROUTE, book.bookId));

  return (
    <Grid
      container
      alignItems="flex-start"
      direction="column"
      spacing={1}
      onClick={openBook}
    >
      <Grid item xs={12}>
        <VerticalRectangular className={classes.bookCover}>
          <img alt={`book cover of ${book.title}`} src={book.pictures[0]} />
        </VerticalRectangular>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.bookTitle} variant="h6">
          {book.title}
        </Typography>
        <Typography
          className={classes.bookPrice}
          variant="h6"
        >{`${book.currency} ${book.amount}`}</Typography>
      </Grid>
    </Grid>
  );
}
