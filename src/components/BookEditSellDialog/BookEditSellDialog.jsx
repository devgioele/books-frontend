import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useAxios } from 'hooks/axios';
import { editBook, sellBook, uploadBookImage } from 'api/books';
import { CircularProgress, useMediaQuery } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ImageDropzone from 'components/ImageDropzone';
import { bookConditions } from 'utils/constants';
import { useSnackbar } from 'notistack';
import StdMessages from 'messages/standard';
import loadCurrencies from 'api/currencies';

const unwrapEventValue = (block) => (event) => {
  block(event.target.value);
};

const evaluateNumColumns = (upSmall, upSmallMedium, upLarge) => {
  let cols = 1;
  if (upLarge) cols = 4;
  else if (upSmallMedium) cols = 3;
  else if (upSmall) cols = 2;
  return cols;
};

export default function BookEditSellDialog({ backToParent, bookToEdit }) {
  const downSmall = useMediaQuery((theme) =>
    theme.breakpoints.down(theme.breakpoints.values.sm)
  );
  const upSmall = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const upSmallMedium = useMediaQuery((theme) => theme.breakpoints.up('smmd'));
  const upLarge = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { enqueueSnackbar } = useSnackbar();

  const cols = evaluateNumColumns(upSmall, upSmallMedium, upLarge);
  const [invalid, setInvalid] = useState(false);
  const [isBlocked, setBlocked] = useState(false);
  const [currenciesYetToFetch, setCurrenciesYetToFetch] = useState(true);
  const [
    fetchCurrencies,
    cancelCurrencies,
    currencies,
    ,
    isLoadingCurrencies,
  ] = useAxios(
    loadCurrencies,
    'loading currencies',
    () => setCurrenciesYetToFetch(false),
    () => {
      enqueueSnackbar(StdMessages.CURRENCIES_ERROR(), {
        variant: 'error',
      });
      backToParent(false)();
    }
  );
  // Fetch currencies on mounting and cancel on unmounting
  useEffect(() => {
    fetchCurrencies();
    return cancelCurrencies;
  }, []);
  const currencySymbolFromName = (name) =>
    currencies?.filter((currency) => currency.name === name)[0]?.symbol;

  const defaultCondition = bookToEdit?.condition || bookConditions.ok;
  // We store all props of the book in a state, expect for the picture urls.
  // The picture urls are stored in a ref for writing with immediate effect.
  const [currentBook, setNewBook] = useState({
    description: bookToEdit?.description,
    currency: bookToEdit?.currency,
    amount: bookToEdit?.amount,
    condition: defaultCondition,
  });
  const updateBook = (fieldName) => (value) => {
    setInvalid(false);
    const bookGen = {
      ...currentBook,
      [fieldName]: value,
    };
    setNewBook(bookGen);
  };

  // We compute the default currency at the beginning and
  // once 'currencies' has been fetched
  const defaultCurrencyName = useMemo(() => {
    const newDefaultName =
      bookToEdit?.currency || (currencies && currencies[0]?.name);
    updateBook('currency')(currencySymbolFromName(newDefaultName));
    return newDefaultName;
  }, [currencies]);
  const pictureUrls = useRef(bookToEdit?.pictures || []);

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
  const isLoading = isLoadingSell || isLoadingEdit || isLoadingCurrencies;
  const handleConfirm = () => {
    // Merge state and ref
    const currentBookWithPictures = currentBook;
    currentBookWithPictures.pictures = pictureUrls.current;
    if (bookToEdit) {
      edit(bookToEdit.bookId, currentBookWithPictures);
    } else {
      sell(currentBookWithPictures);
    }
  };
  const handleCancel = () => backToParent(false)();

  return (
    <Dialog
      fullScreen={downSmall}
      fullWidth={true}
      open={true}
      onClose={() => {
        if (!isLoading) handleCancel();
      }}
    >
      <DialogTitle>
        {bookToEdit ? `Modify '${bookToEdit.title}'` : 'Sell a new book'}
      </DialogTitle>
      <DialogContent>
        <div style={{ padding: 20 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <ImageDropzone
                minImages={1}
                maxImages={4}
                explanation="Pictures look best with a ratio of 2:3."
                cols={cols}
                pictureUrls={pictureUrls.current}
                addPictureUrl={(urlToAdd) => {
                  pictureUrls.current = [...pictureUrls.current, urlToAdd];
                }}
                removePictureUrl={(urlToRemove) => {
                  pictureUrls.current = pictureUrls.current.filter(
                    (url) => url !== urlToRemove
                  );
                }}
                setBlocked={setBlocked}
                preferDownload={false}
                uploadEndpoint={uploadBookImage}
              />
            </Grid>
            {!bookToEdit && (
              <Grid item xs={12}>
                <TextField
                  required
                  color="secondary"
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
                  color="secondary"
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
                color="secondary"
                variant="outlined"
                fullWidth
                multiline={true}
                error={invalid}
                label="Description"
                defaultValue={bookToEdit?.description}
                onChange={unwrapEventValue(updateBook('description'))}
              />
            </Grid>
            <Grid item xs={6}>
              {currenciesYetToFetch || isLoadingCurrencies ? (
                <TextField
                  required
                  disabled={true}
                  color="secondary"
                  variant="outlined"
                  label="Currency"
                />
              ) : (
                <Autocomplete
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      error={invalid}
                      color="secondary"
                      variant="outlined"
                      label="Currency"
                    />
                  )}
                  options={currencies.map((currency) => currency.name)}
                  defaultValue={defaultCurrencyName}
                  onChange={(event, value) =>
                    updateBook('currency')(currencySymbolFromName(value))
                  }
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                color="secondary"
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
                    error={invalid}
                    color="secondary"
                    label="Condition"
                    variant="outlined"
                  />
                )}
                options={Object.keys(bookConditions)}
                defaultValue={defaultCondition}
                onChange={(event, value) => updateBook('condition')(value)}
              />
            </Grid>
            {!bookToEdit && (
              <Grid item xs={12}>
                <TextField
                  required
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  error={invalid}
                  label="Location"
                  defaultValue={bookToEdit?.locationName}
                  onChange={unwrapEventValue(updateBook('locationName'))}
                />
              </Grid>
            )}
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
            <Button onClick={handleConfirm} disabled={isLoading || isBlocked}>
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
