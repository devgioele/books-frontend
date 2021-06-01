import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useAxios } from 'hooks/axios';
import { exploreBooks } from 'api/books';
import { useHistory } from 'react-router-dom';
import { BOOK_ROUTE, toRoute } from '../../../routing/helpers';

const useStyles = makeStyles((theme) => ({
  bookCard: {
    padding: theme.spacing(2),
    '&:hover': {
      boxShadow: `0px 10px 25px -5px ${theme.palette.custom.shadowGray}`,
    },
  },
  bookTitle: {
    fontWeight: 'bold',
  },
  bookCover: {
    width: 'auto',
    [theme.breakpoints.up('xs')]: {
      height: '150px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '200px',
    },
    height: 'auto',
    objectFit: 'scale-down',
    borderRadius: 6,
    boxShadow: `1px 1px 5px 1px ${theme.palette.custom.shadowGray}`,
  },
}));

export default function PopularBooks() {
  const classes = useStyles();

  const [fExploreBooks, cExploreBooks, data, ,] = useAxios(exploreBooks);

  useEffect(() => {
    fExploreBooks();
    return () => cExploreBooks();
  }, []);

  return (
    <Carousel interval={10000} animation="slide">
      {data?.popular?.map((book, index) => (
        <PopularBook key={index} book={book} />
      ))}
    </Carousel>
  );
}

function PopularBook({ book }) {
  const classes = useStyles();
  const history = useHistory();
  const openBook = () => history.push(toRoute(BOOK_ROUTE, book.bookId));

  return (
    <Paper
      className={clsx(classes.bookCard)}
      variant="outlined"
      onClick={openBook}
    >
      <Grid container justify="space-between" alignItems="center" spacing={2}>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item>
              <Typography className={classes.bookTitle} variant="h3">
                {book.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.bookTitle} variant="h4">
                {`${book.currency} ${book.amount}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">{book.description}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Condition: {book.condition}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <img
            alt="book cover"
            className={classes.bookCover}
            src={book.pictures[0]}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
