import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { Grid, Paper, Typography, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { BOOK_ROUTE, toRoute } from 'routing/helpers';
import VerticalRectangular from 'components/VerticalRectangular';

const useStyles = makeStyles((theme) => ({
  bookCard: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    '&:hover': {
      boxShadow: `0px 10px 25px -5px ${theme.palette.custom.shadowGray}`,
    },
    borderRadius: 20,
  },
  bookTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.1em',
    maxHeight: '2.2em',
    fontWeight: 'bold',
  },
  bookCover: {
    [theme.breakpoints.up('xs')]: {
      width: '100px',
      height: '150px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '133px',
      height: '200px',
    },
  },
}));

export default function PopularBooks({ books }) {
  return (
    <Carousel
      interval={1000000}
      animation="slide"
      navButtonsAlwaysInvisible={true}
    >
      {books.map((book, index) => (
        <PopularBook key={index} book={book} />
      ))}
    </Carousel>
  );
}

function PopularBook({ book }) {
  const classes = useStyles();
  const downSmall = useMediaQuery((theme) =>
    theme.breakpoints.down(theme.breakpoints.values.sm)
  );
  const history = useHistory();
  const openBook = () => history.push(toRoute(BOOK_ROUTE, book.bookId));

  return (
    <Paper className={classes.bookCard} variant="outlined" onClick={openBook}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={9}>
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
              <Typography className={classes.bookTitle} variant="h6">
                {`${book.currency} ${book.amount}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                The book is in <b>{book.condition}</b> conditions
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grid
            container
            direction="row"
            justify={downSmall ? 'center' : 'flex-end'}
            alignItems="center"
          >
            <Grid item>
              <VerticalRectangular className={classes.bookCover}>
                <img
                  alt={`book cover of ${book.title}`}
                  src={book.pictures[0]}
                />
              </VerticalRectangular>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
