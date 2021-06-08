import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { BOOK_ROUTE, toRoute } from 'routing/helpers';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  bookCover: {
    width: 'auto',
    [theme.breakpoints.up('xs')]: {
      height: '150px',
      maxWidth: '100px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '200px',
      maxWidth: '150px',
    },
    objectFit: 'cover',
    borderRadius: 5,
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
        <img
          alt="book cover"
          className={classes.bookCover}
          src={book.pictures[0]}
        />
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
