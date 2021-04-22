import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import SellBooksList from 'components/SellBooksList';
import {
  EDIT_SELL_ROUTE,
  NEW_SELL_ROUTE,
  renderRoute,
  toRoute,
} from 'routing/helpers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

// TODO: remove once real apis are implemented.
const sampleBook = {
  isbn: '978-1-56619-909-4',
  title: 'Alice in Wonderland',
  description:
    'Alice in Wonderland has been known for its curious story.',
  currency: '$',
  price: 20,
  condition: 'ok',
  pictures: ['https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/63fc5679081483.5cb7f1e0aa619.png'],
  publicationDate: '3rd May 2020',
  seller: 'riccardo',
  locationName: 'Trento',
  locationLatitude: 46.0747793,
  locationLongitude: 11.3547582,
  saleDate: new Date(),
  buyer: 'marco',
};

// TODO: replace with real api call.
function fetchSellingBooks(done) {
  const sellingBooks = [sampleBook, sampleBook];
  setTimeout(() => done(sellingBooks), 100);
}

// TODO: replace with real api call.
function fetchSoldBooks(done) {
  const soldBooks = [sampleBook];
  setTimeout(() => done(soldBooks), 100);
}

export default function Sell({ routes }) {
  const [isLoadingSelling, setLoadingSelling] = useState(false);
  const [isLoadingSold, setLoadingSold] = useState(false);
  const [sellingBooks, setSellingBooks] = useState([]);
  const [soldBooks, setSoldBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(undefined);

  const history = useHistory();

  const classes = useStyles();

  const newSellRoute = routes[0];
  const editSellRoute = routes[1];

  useEffect(() => {
    setLoadingSelling(true);
    fetchSellingBooks((books) => {
      setSellingBooks(books);
      setLoadingSelling(false);
    });
  }, [setLoadingSelling, setSellingBooks]);

  useEffect(() => {
    setLoadingSold(true);
    fetchSoldBooks((books) => {
      setSoldBooks(books);
      setLoadingSold(false);
    });
  }, [setLoadingSold, setSoldBooks]);

  return (
    <>
      {newSellRoute && renderRoute(newSellRoute)}
      {editSellRoute && renderRoute(
        editSellRoute,
        null,
        { book: bookToEdit })
      }
      <Grid container>
        <Grid item xs={12}>
          <SellBooksList
            loadingSelling={isLoadingSelling}
            loadingSold={isLoadingSold}
            sellingBooks={sellingBooks}
            soldBooks={soldBooks}
            onEdit={(book) => {
              setBookToEdit(book);
              history.push(toRoute(EDIT_SELL_ROUTE));
            }}
          />
        </Grid>
      </Grid>
      <Fab
        className={classes.fab}
        color='primary'
        aria-label='sell-book'
        onClick={() => history.push(toRoute(NEW_SELL_ROUTE))}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
