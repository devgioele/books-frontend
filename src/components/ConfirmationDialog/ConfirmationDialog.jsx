import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';

const sanitizeEvent = (block) => (event) => {
  event.stopPropagation();
  block(event.target.value);
};

export default function ConfirmationDialog({
  title,
  details,
  onCancel,
  onConfirm,
  isLoading,
  loadingCancellable,
}) {
  return (
    <Dialog fullScreen={false} fullWidth={true} open={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{details}</DialogContentText>
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
            <Button
              onClick={sanitizeEvent(onCancel)}
              disabled={!loadingCancellable && isLoading}
            >
              Cancel
            </Button>
            <Button onClick={sanitizeEvent(onConfirm)} disabled={isLoading}>
              Confirm
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
