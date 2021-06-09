import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmCard from 'components/ConfirmCard';
import { useAxios } from 'hooks/axios';
import { confirmSell, getBookByTransaction } from 'api/books';

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
  },
});

export default function Confirm() {
  const classes = useStyles();
  const { transactionId } = useParams();
  const [
    fGetBookByTransaction,
    cGetBookByTransaction,
    book,
    bookError,
    isLoadingBook,
  ] = useAxios(getBookByTransaction);
  const [
    fConfirmSell,
    cConfirmSell,
    confirm,
    confirmError,
    isLoadingConfirm,
  ] = useAxios(confirmSell);

  useEffect(() => {
    fGetBookByTransaction(transactionId);
    return () => cGetBookByTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  const onRetry = () => {
    // We might retry just because the confirmation failed.
    // Therefore, cancel the confirmation to reset 'confirmError'.
    cConfirmSell();
    cGetBookByTransaction();
    fGetBookByTransaction(transactionId);
  };

  const onConfirm = () => {
    cConfirmSell();
    fConfirmSell(transactionId);
  };

  return (
    <Grid
      className={classes.container}
      container
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <ConfirmCard
          book={book}
          bookError={bookError}
          confirm={confirm}
          confirmError={confirmError}
          isLoadingBook={isLoadingBook}
          isLoadingConfirm={isLoadingConfirm}
          onRetry={onRetry}
          onConfirm={onConfirm}
        />
      </Grid>
    </Grid>
  );
}
