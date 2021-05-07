import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ConfirmCard from 'components/ConfirmCard';
import useAxios from 'hooks/axios';
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
  }, [transactionId]);

  const onRetry = () => {
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
          confirm={confirm}
          bookError={bookError}
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
