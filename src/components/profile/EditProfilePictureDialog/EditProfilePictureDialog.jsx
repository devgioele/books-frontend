import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { editProfile, uploadProfilePicture } from 'api/profile';
import ImageDropzone from 'components/ImageDropzone';
import { useAxios } from '../../../hooks/axios';

export default function EditProfilePictureDialog({
  backToProfile,
  isDataLoaded,
  profilePicture,
}) {
  const [isBlocked, setBlocked] = useState(false);
  const [imagePresent, setImagePresent] = useState(!!profilePicture);
  const [fRemovePicture, , , , isLoading] = useAxios(
    // TODO: add endpoint to remove the profile picture,
    'remove the profile picture',
    () => backToProfile(true)
  );

  const handleClose = () => {
    if (imagePresent) {
      backToProfile(true);
    } else {
      fRemovePicture();
    }
  };
  const handleCancel = () => backToProfile(false);

  /*
  If there is nothing to show, because the user visited this route manually,
  go back the the profile page
   */
  if (!isDataLoaded) {
    handleCancel();
  }

  return (
    <Dialog
      fullScreen={false}
      fullWidth={true}
      open={true}
      onClose={() => {
        if (!isBlocked) handleCancel();
      }}
    >
      <DialogTitle>Update your profile picture</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageDropzone
              minImages={0}
              maxImages={1}
              // We embed the single picture into an array
              pictureUrls={profilePicture ? [profilePicture] : []}
              addPictureUrl={() => setImagePresent(true)}
              removePictureUrl={() => setImagePresent(false)}
              setBlocked={setBlocked}
              uploadEndpoint={uploadProfilePicture}
              preferDownload={true}
              cols={1}
            />
          </Grid>
        </Grid>
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
            <Button onClick={handleClose} disabled={isLoading || isBlocked}>
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
