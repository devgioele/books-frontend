import React, { useEffect, useState } from 'react';
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
import { editBook, sellBook } from 'api/books';
import { CircularProgress } from '@material-ui/core';
import { SELL_ROUTE } from 'routing/helpers';
import { Autocomplete } from '@material-ui/lab';
import conditions from 'utils/condition';

const unwrapValue = (block) => (event) => {
  block(event.target.value);
};

export default function SellBookDialog({ book }) {
  const defaultCondition = book?.condition || conditions[0];
  const [newBook, setNewBook] = useState({
    isbn: book?.isbn,
    title: book?.title,
    description: book?.description,
    currency: book?.currency,
    price: book?.price,
    condition: defaultCondition,
    pictures: [],
    locationName: book?.locationName,
  });
  const updateNewBook = (fieldName) => (value) => {
    setNewBook({
      ...newBook,
      [fieldName]: value,
    });
  };
  const [invalid, setInvalid] = useState(false);
  const history = useHistory();
  const backToParent = () => history.push(SELL_ROUTE);

  const [sell, cancelSell, dataSell, errorSell, isLoadingSell] = useAxios(
    sellBook,
    'selling book',
    () => backToParent(),
    () => setInvalid(true)
  );
  const [edit, cancelEdit, dataEdit, errorEdit, isLoadingEdit] = useAxios(
    editBook,
    'editing book',
    () => backToParent(),
    () => setInvalid(true)
  );
  const isLoading = isLoadingSell || isLoadingEdit;
  const handleSubmit = () => {
    if (book) {
      edit(book.bookId, newBook);
      return cancelEdit;
    }
    sell(newBook);
    return cancelSell;
  };

  return (
    <Dialog fullScreen={false} fullWidth={true} open={true}>
      <DialogTitle>
        {book ? `Modify '${book.title}'` : 'Sell a new book'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={4}>
            {!book && (
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
            )}
            {!book && (
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
            )}
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
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                error={invalid}
                label="Currency"
                defaultValue={book?.currency}
                onChange={unwrapValue(updateNewBook('currency'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                error={invalid}
                label="Price"
                type="number"
                inputProps={{ min: 0 }}
                defaultValue={book?.price}
                onChange={(event) =>
                  updateNewBook('price')(parseFloat(event.target.value, 10))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Condition"
                    variant="outlined"
                  />
                )}
                options={conditions}
                defaultValue={defaultCondition}
                onChange={(event, value) => updateNewBook('condition')(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                error={invalid}
                label="Location"
                defaultValue={book?.locationName}
                onChange={unwrapValue(updateNewBook('locationName'))}
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
              {book ? 'Modify' : 'Sell'}
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
