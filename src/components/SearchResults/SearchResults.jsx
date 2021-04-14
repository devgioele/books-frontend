import React from 'react';
import { Button, Divider, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BookCard from 'components/BookCard';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { BOOK_ROUTE, route, SIGNUP_ROUTE } from '../../routing/helpers';

const useStyles = makeStyles((theme) => ({
  searchResults: {
    position: 'absolute',
    borderRadius: 10,
    width: '100%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    // offset-x | offset-y | blur-radius | spread-radius
    boxShadow: `0px 1px 3px 0px ${theme.colors.shadowGray}`,
    '&:hover': {
      boxShadow: `0px 20px 25px -5px ${theme.colors.shadowGray}`,
    },
  },
}));

const books = [
  {
    title: 'Alice in Wonderland',
    isbn: '978-2-12345-680-3',
    price: '$ 20',
    condition: 'good',
    cover:
      'https://i.etsystatic.com/6908127/r/il/8fa6d0/1519409460/il_570xN.1519409460_3v5o.jpg',
  },
  {
    title: 'Alice in Wonderland 2',
    isbn: '978-2-12345-680-5',
    price: 'ETH 0.009',
    condition: 'perfect',
    cover: 'https://blackwells.co.uk/jacket/l/9781447279990.jpg',
  },
  {
    title: 'The Intelligent Investor',
    isbn: '978-2-12345-681-2',
    price: '€ 22.70',
    condition: 'ok',
    cover: 'https://blackwells.co.uk//jacket/l/9780060555665.jpg',
  },
];

export default function SearchResults(props) {
  const history = useHistory();
  const classes = useStyles();
  const { query } = props;

  return (
    <Paper className={classes.searchResults} variant='outlined'>
      <Grid
        container
        spacing={3}
        direction='column'
        justify='flex-start'
        alignItems='stretch'
      >
        {books
          /*
          This is just an example of how the query can be used.
          Later on the query will be sent to the backend.
          A new state 'loading' should be created to show some component
          until the backend replies.
           */
          .filter((book) =>
            book.title.toLowerCase()
              .includes(query.toLowerCase()),
          )
          .map((book) => (
            <Grid
              item
              key={book.isbn}
              onClick={() => history.push(route(BOOK_ROUTE, book.isbn))}
            >
              <BookCard book={book} />
            </Grid>
          ))}
        <Divider light />
        <Grid item>
          <SeeMore />
        </Grid>
      </Grid>
    </Paper>
  );
}

function SeeMore() {
  const history = useHistory();

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={1}
    >
      <Grid item>
        <Typography variant='h6'>Interested in these books?</Typography>
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          onClick={() => history.push(route(SIGNUP_ROUTE))}
        >
          Sign up for free
        </Button>
      </Grid>
    </Grid>
  );
}
