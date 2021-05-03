import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useAxios from 'hooks/axios';
import { sellBook } from 'api/books';
import { CircularProgress } from '@material-ui/core';
import { SELL_ROUTE } from 'routing/helpers';

const unwrapValue = (block) => (event) => {
  block(event.target.value);
};

export default function SellBookDialog({ book }) {
  const [newBook, setNewBook] = useState({});
  const updateNewBook = (fieldName) => (value) => {
    setNewBook({
      ...newBook,
      [fieldName]: value,
    });
  };
  const [invalid, setInvalid] = useState(false);
  const history = useHistory();
  const backToParent = () => history.push(SELL_ROUTE);

  const [fetch, cancelPrevious, data, error, isLoading] = useAxios(
    sellBook,
    'selling book',
    () => backToParent(),
    () => setInvalid(true)
  );
  const handleSubmit = () => fetch(newBook);

  return (
    <Dialog fullScreen={false} fullWidth={true} open={true}>
      <DialogTitle>
        {book ? 'Modify an existing book' : 'Sell a new book'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                error={invalid}
                label="ISBN"
                defaultValue={book?.isbn}
                onChange={unwrapValue(updateNewBook('isbn'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                error={invalid}
                label="Title"
                defaultValue={book?.title}
                onChange={unwrapValue(updateNewBook('title'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                error={invalid}
                label="Description"
                defaultValue={book?.description}
                onChange={unwrapValue(updateNewBook('description'))}
              />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid
          container
          direction="row-reverse"
          justify="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button onClick={backToParent} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              Sell
            </Button>
          </Grid>
          {isLoading && (
            <Grid item style={{ paddingLeft: '24px' }}>
              <CircularProgress
                variant="indeterminate"
                disableShrink
                color="secondary"
                size={20}
                thickness={4}
              />
            </Grid>
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
