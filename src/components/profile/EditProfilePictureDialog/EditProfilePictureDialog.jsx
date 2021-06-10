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
import { removeProfilePicture, uploadProfilePicture } from 'api/profile';
import ImageDropzone from 'components/ImageDropzone';
import { useAxios } from 'hooks/axios';
import { themedBorderRadius } from 'theming';

export default function EditProfilePictureDialog({
  backToProfile,
  isDataLoaded,
  profilePicture,
}) {
  const [isBlocked, setBlocked] = useState(false);
  const [doRemovePicture, , , , isLoading] = useAxios(
    removeProfilePicture,
    'remove the profile picture'
  );

  const handleClose = () => backToProfile(true);

  /*
  If there is nothing to show, because the user visited this route manually,
  go back the the profile page
   */
  if (!isDataLoaded) {
    handleClose();
  }

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: themedBorderRadius },
      }}
      fullScreen={false}
      fullWidth={true}
      open={true}
      onClose={() => {
        if (!isBlocked) handleClose();
      }}
    >
      <DialogTitle>Update your profile picture</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageDropzone
              minImages={0}
              maxImages={1}
              explanation="The picture is cropped down to a square."
              // We embed the single picture into an array
              pictureUrls={profilePicture ? [profilePicture] : []}
              addPictureUrl={handleClose}
              removePictureUrl={doRemovePicture}
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
