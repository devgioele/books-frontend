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

const unwrapValue = (block) => (event) => {
  block(event.target.value);
};

export default function SellBookDialog({ book }) {
  const [newBook, setNewBook] = useState({});
  const history = useHistory();

  const updateNewBook = (fieldName) => (value) => {
    setNewBook({
      ...newBook,
      [fieldName]: value,
    });
  };

  return (
    <Dialog
      fullScreen={false}
      fullWidth={true}
      open={true}
    >
      <DialogTitle>{book ? 'Modify an existing book' : 'Sell a new book'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid
            container
            spacing={4}
          >
            <Grid item xs={12}>
              <TextField
                required
                variant='outlined'
                fullWidth={true}
                label='ISBN'
                onChange={unwrapValue(updateNewBook('isbn'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant='outlined'
                fullWidth={true}
                label='Title'
                onChange={unwrapValue(updateNewBook('title'))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant='outlined'
                fullWidth={true}
                label='Description'
                onChange={unwrapValue(updateNewBook('description'))}
              />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={history.goBack}>
          Cancel
        </Button>
        <Button>
          Sell
        </Button>
      </DialogActions>
    </Dialog>
  );
}
