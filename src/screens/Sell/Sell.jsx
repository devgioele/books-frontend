import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import SellBooksList from 'components/SellBooksList';
import {
  EDIT_SELL_ROUTE,
  NEW_SELL_ROUTE,
  renderRoute,
  SELL_ROUTE,
  toRoute,
} from 'routing/helpers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useAxios from 'hooks/axios';
import { getSellingBooks, getSoldBooks, removeBook } from 'api/books';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { resetFirstInputPolyfill } from 'web-vitals/dist/modules/lib/polyfills/firstInputPolyfill';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Sell({ routes }) {
  const classes = useStyles();
  const [bookToEdit, setBookToEdit] = useState(undefined);
  const [bookToRemove, setBookToRemove] = useState(undefined);
  const history = useHistory();
  const newSellRoute = routes[0];
  const editSellRoute = routes[1];

  const [
    fetchSellingBooks,
    cancelSelling,
    sellingBooks = [],
    errorSelling,
    isLoadingSelling,
  ] = useAxios(getSellingBooks, 'fetching selling books', () => {
    // console.log('received selling books');
  });
  const [
    fetchSoldBooks,
    cancelSold,
    soldBooks = [],
    errorSold,
    isLoadingSold,
  ] = useAxios(getSoldBooks, 'fetching sold books', () => {
    // console.log('received sold books');
  });

  const [
    remove,
    cancelRemoval,
    responseRemoval,
    errorRemoval,
    isLoadingRemoval,
  ] = useAxios(removeBook, 'removing book', () => setBookToRemove(undefined));

  // These two effects are applied only on mounting.
  // They are only clean up on unmounting.
  useEffect(() => {
    fetchSellingBooks();
    return () => cancelSelling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchSoldBooks();
    return () => cancelSold();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const refreshBooksList = () => {
    cancelSelling();
    fetchSellingBooks();
    cancelSold();
    fetchSoldBooks();
  };

  return (
    <>
      {newSellRoute && renderRoute(newSellRoute, { refreshBooksList })}
      {editSellRoute &&
        bookToEdit &&
        renderRoute(editSellRoute, {
          refreshBooksList,
          bookToEdit,
        })}
      {bookToRemove && (
        <ConfirmationDialog
          title={`Are you sure you want to remove '${bookToRemove.title}'?`}
          onCancel={() => {
            // cancelRemoval(); if here then also in edit and new
            setBookToRemove(undefined);
          }}
          onConfirm={() => remove(bookToRemove.bookId)}
          isLoading={isLoadingRemoval}
        />
      )}
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
            onRemove={(book) => setBookToRemove(book)}
          />
        </Grid>
      </Grid>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="sell-book"
        onClick={() => history.push(toRoute(NEW_SELL_ROUTE))}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
