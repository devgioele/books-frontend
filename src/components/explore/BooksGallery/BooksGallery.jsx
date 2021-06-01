import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { BOOK_ROUTE, toRoute } from 'routing/helpers';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  bookCover: {
    width: 'auto',
    height: '200px',
    objectFit: 'scale-down',
    borderRadius: 3,
    boxShadow: `1px 1px 5px 1px ${theme.palette.custom.shadowGray}`,
    '&:hover': {
      boxShadow: `3px 3px 15px 3px ${theme.palette.custom.shadowGray}`,
    },
  },
}));

export default function BooksGallery({ books }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
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
    <Grid container alignItems="center" spacing={2} onClick={openBook}>
      <Grid item>
        <img
          alt="book cover"
          className={classes.bookCover}
          src={book.pictures[0]}
        />
      </Grid>
    </Grid>
  );
}
