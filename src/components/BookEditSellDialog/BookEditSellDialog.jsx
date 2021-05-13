import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useAxios from 'hooks/axios';
import { editBook, sellBook } from 'api/books';
import { CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import bookConditions from 'utils/bookConditions';

const unwrapEventValue = (block) => (event) => {
  block(event.target.value);
};

export default function BookEditSellDialog({ backToParent, bookToEdit }) {
  const defaultCondition = bookToEdit?.condition || bookConditions[0];
  const [newBook, setNewBook] = useState({
    description: bookToEdit?.description,
    currency: bookToEdit?.currency,
    price: bookToEdit?.price,
    condition: defaultCondition,
    pictures: [],
  });
  const [invalid, setInvalid] = useState(false);
  const updateNewBook = (fieldName) => (value) => {
    setInvalid(false);
    const bookGen = {
      ...newBook,
      [fieldName]: value,
    };
    setNewBook(bookGen);
  };

  const [sell, , , , isLoadingSell] = useAxios(
    sellBook,
    'selling book',
    backToParent(true),
    () => setInvalid(true)
  );
  const [edit, , , , isLoadingEdit] = useAxios(
    editBook,
    'editing book',
    backToParent(true),
    () => setInvalid(true)
  );
  const isLoading = isLoadingSell || isLoadingEdit;
  const handleConfirm = () => {
    if (bookToEdit) {
      edit(bookToEdit.bookId, newBook);
    } else {
      sell(newBook);
    }
  };
  const handleCancel = () => backToParent(false)();

  return (
    <Dialog fullScreen={false} fullWidth={true} open={true}>
      <DialogTitle>
        {bookToEdit ? `Modify '${bookToEdit.title}'` : 'Sell a new book'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={4}>
            {!bookToEdit && (
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  error={invalid}
                  label="ISBN"
                  defaultValue={bookToEdit?.isbn}
                  onChange={unwrapEventValue(updateNewBook('isbn'))}
                />
              </Grid>
            )}
            {!bookToEdit && (
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  error={invalid}
                  label="Title"
                  defaultValue={bookToEdit?.title}
                  onChange={unwrapEventValue(updateNewBook('title'))}
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
                defaultValue={bookToEdit?.description}
                onChange={unwrapEventValue(updateNewBook('description'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                error={invalid}
                label="Currency"
                defaultValue={bookToEdit?.currency}
                onChange={unwrapEventValue(updateNewBook('currency'))}
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
                defaultValue={bookToEdit?.price}
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
                options={bookConditions}
                defaultValue={defaultCondition}
                onChange={(event, value) => updateNewBook('condition')(value)}
              />
            </Grid>
            {!bookToEdit && (
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  fullWidth
                  error={invalid}
                  label="Location"
                  defaultValue={bookToEdit?.locationName}
                  onChange={unwrapEventValue(updateNewBook('locationName'))}
                />
              </Grid>
            )}
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
            <Button onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={isLoading}>
              {bookToEdit ? 'Modify' : 'Sell'}
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
