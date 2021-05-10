import React from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import BookCard from '../BookCard';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  cardButton: {
    width: '100%',
  },
}));

export default function ConfirmCard({
  book,
  bookError,
  confirm,
  confirmError,
  isLoadingBook,
  isLoadingConfirm,
  onRetry,
  onConfirm,
}) {
  const classes = useStyles();
  const error = bookError || confirmError;

  return (
    <Paper className={classes.card} variant="outlined">
      <Grid container>
        <Grid item>{isLoadingBook && <CircularProgress />}</Grid>
        <Grid item>{error && <Error onRetry={onRetry} />}</Grid>
        <Grid item>
          {!error && book && (
            <Success
              book={book}
              confirm={confirm}
              isLoadingConfirm={isLoadingConfirm}
              onConfirm={onConfirm}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

function Error({ onRetry }) {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="subtitle1">A problem occurred!</Typography>
        <Typography variant="subtitle2">
          The transaction might be expired. If that&apos;s the case, ask the
          seller to create a new sell link for you. Keep in mind that you cannot
          confirm your own sell links.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          className={classes.cardButton}
          color="primary"
          variant="contained"
          disableElevation={true}
          onClick={onRetry}
        >
          Try again
        </Button>
      </Grid>
    </Grid>
  );
}

function Success({ book, confirm, isLoadingConfirm, onConfirm }) {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="subtitle2">
          You have been request to confirm the selling of {book.title}.
        </Typography>
      </Grid>
      <Grid item>
        <BookCard book={book} />
      </Grid>
      <Grid item>
        {!confirm && isLoadingConfirm && <CircularProgress />}
        {!confirm && !isLoadingConfirm && (
          <Button
            className={classes.cardButton}
            color="primary"
            variant="contained"
            disableElevation={true}
            onClick={() => onConfirm()}
          >
            Confirm selling
          </Button>
        )}
        {confirm && (
          <Typography variant="subtitle2">
            Selling confirmed successfully!
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
