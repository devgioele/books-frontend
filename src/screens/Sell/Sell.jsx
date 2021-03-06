import React, { useEffect, useState } from 'react';
import { Grid, useTheme, Zoom } from '@material-ui/core';
import SellBooksList from 'components/SellBooksList';
import {
  EDIT_SELL_ROUTE,
  LINK_SELL_ROUTE,
  NEW_SELL_ROUTE,
  REMOVE_SELL_ROUTE,
  renderRoute,
  toRoute,
} from 'routing/helpers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useAxios } from 'hooks/axios';
import { getSellingBooks, getSoldBooks, removeBook } from 'api/books';
import ConfirmationDialog from 'components/ConfirmationDialog';
import { pageFrame } from 'theming';

const useStyles = makeStyles((theme) => ({
  ...pageFrame(theme),
  fab: {
    position: 'fixed',
    // Thin bottom navigation
    [theme.breakpoints.up('xs')]: {
      bottom: theme.spacing(9),
    },
    // Fat bottom navigation
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(10),
    },
    // Left drawer
    [theme.breakpoints.up('smmd')]: {
      bottom: theme.spacing(2),
    },

    right: theme.spacing(2),
  },
}));

export default function Sell({ routes }) {
  const classes = useStyles();
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const [bookToEdit, setBookToEdit] = useState(undefined);
  const [bookToRemove, setBookToRemove] = useState(undefined);
  const [bookToLink, setBookToLink] = useState(undefined);
  const history = useHistory();
  const [newSellRoute, editSellRoute, removeSellRoute, linkSellRoute] = routes;

  const [
    fetchSellingBooks,
    cancelSelling,
    sellingBooks = [],
    ,
    isLoadingSelling,
  ] = useAxios(getSellingBooks, 'fetching selling books');
  const [
    fetchSoldBooks,
    cancelSold,
    soldBooks = [],
    ,
    isLoadingSold,
  ] = useAxios(getSoldBooks, 'fetching sold books');

  // These two effects are applied only on mounting.
  // They are only cleaned up on unmounting.
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

  const backToParent = (doRefresh) => () => {
    history.goBack();
    if (doRefresh) {
      fetchSellingBooks();
      fetchSoldBooks();
    }
  };

  return (
    <>
      {newSellRoute && renderRoute(newSellRoute, { backToParent })}
      {editSellRoute &&
        bookToEdit &&
        renderRoute(editSellRoute, { backToParent, bookToEdit })}
      {removeSellRoute &&
        bookToRemove &&
        renderRoute(removeSellRoute, { backToParent, bookToRemove })}
      {linkSellRoute &&
        bookToLink &&
        renderRoute(linkSellRoute, { backToParent, bookToLink })}
      <Grid className={classes.pageFrame} container>
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
            onRemove={(book) => {
              setBookToRemove(book);
              history.push(toRoute(REMOVE_SELL_ROUTE));
            }}
            onSellLink={(book) => {
              setBookToLink(book);
              history.push(toRoute(LINK_SELL_ROUTE));
            }}
          />
        </Grid>
      </Grid>
      <Zoom
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab
          className={classes.fab}
          color="primary"
          elevation={24}
          aria-label="sell-book"
          onClick={() => history.push(toRoute(NEW_SELL_ROUTE))}
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </>
  );
}

export function BookRemoveDialog({ backToParent, bookToRemove }) {
  const [remove, cancelRemoval, , , isLoadingRemoval] = useAxios(
    removeBook,
    'removing book',
    backToParent(true)
  );

  const handleConfirm = () => remove(bookToRemove.bookId);
  const handleCancel = () => {
    cancelRemoval();
    backToParent(false)();
  };

  return (
    <ConfirmationDialog
      title={`Are you sure you want to remove '${bookToRemove.title}'?`}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      isLoading={isLoadingRemoval}
    />
  );
}
