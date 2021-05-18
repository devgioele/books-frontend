import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useAxios } from 'hooks/axios';
import { editBook, sellBook } from 'api/books';
import { CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import bookConditions from 'utils/bookConditions';
import ImageDropzone from '../ImageDropzone';

const unwrapEventValue = (block) => (event) => {
  block(event.target.value);
};

export default function BookEditSellDialog({ backToParent, bookToEdit }) {
  const defaultCondition = bookToEdit?.condition || bookConditions[0];
  const [currentBook, setNewBook] = useState({
    description: bookToEdit?.description,
    currency: bookToEdit?.currency,
    amount: bookToEdit?.amount,
    pictures: bookToEdit?.pictures || [],
    condition: defaultCondition,
  });
  const [invalid, setInvalid] = useState(false);
  const updateBook = (fieldName) => (value) => {
    setInvalid(false);
    const bookGen = {
      ...currentBook,
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
    if (bookToEdit) edit(bookToEdit.bookId, currentBook);
    else sell(currentBook);
  };
  const handleCancel = () => backToParent(false)();

  return (
    <Dialog fullScreen={false} fullWidth={true} open={true}>
      <DialogTitle>
        {bookToEdit ? `Modify '${bookToEdit.title}'` : 'Sell a new book'}
      </DialogTitle>
      <DialogContent>
        <div style={{ padding: 20 }}>
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
                  onChange={unwrapEventValue(updateBook('isbn'))}
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
                  onChange={unwrapEventValue(updateBook('title'))}
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
                onChange={unwrapEventValue(updateBook('description'))}
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
                onChange={unwrapEventValue(updateBook('currency'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                error={invalid}
                label="Amount"
                type="number"
                inputProps={{ min: 0 }}
                defaultValue={bookToEdit?.amount}
                onChange={(event) =>
                  updateBook('amount')(parseFloat(event.target.value))
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
                onChange={(event, value) => updateBook('condition')(value)}
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
                  onChange={unwrapEventValue(updateBook('locationName'))}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <ImageDropzone
                minImages={1}
                maxImages={3}
                currentImages={currentBook.pictures}
                setCurrentImages={updateBook('pictures')}
              />
            </Grid>
          </Grid>
        </div>
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
