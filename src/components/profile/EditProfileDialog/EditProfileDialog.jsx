import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import { buildObjectFromFields, imprintObject } from 'utils/functions';
import { useAxios } from 'hooks/axios';
import { editProfile, uploadProfilePicture } from 'api/profile';
import ImageDropzone from 'components/ImageDropzone';

const unwrapEventValue = (block) => (event) => {
  block(event.target.value);
};

export default function EditProfileDialog({
  backToProfile,
  isDataLoaded,
  fields,
}) {
  const [profileDetails, setProfileDetails] = useState(() =>
    buildObjectFromFields(fields)
  );
  const [isBlocked, setBlocked] = useState(false);

  const [fEditProfile, , , , isLoading] = useAxios(
    editProfile,
    'editing the profile',
    () => backToProfile(true)
  );

  const updateProfileDetails = (fieldName) => (value) => {
    setProfileDetails({
      ...profileDetails,
      [fieldName]: value,
    });
  };

  const handleCancel = () => backToProfile(false);

  const handleUpdate = () => {
    // Dirty way for not including the profile picture when editing the profile
    const cleanProfileDetails = { ...profileDetails };
    delete cleanProfileDetails.profilePicture;
    fEditProfile(imprintObject(cleanProfileDetails));
  };

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
        if (!isLoading) handleCancel();
      }}
    >
      <DialogTitle>Update your profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          {fields.map((field, index) => (
            <Grid item key={index} xs={field.space}>
              {field.name === 'profilePicture' ? (
                <ImageDropzone
                  minImages={0}
                  maxImages={1}
                  // We embed the single picture into an array
                  pictureUrls={
                    profileDetails[field.name]
                      ? [profileDetails[field.name]]
                      : []
                  }
                  addPictureUrl={updateProfileDetails(field.name)}
                  removePictureUrl={() =>
                    updateProfileDetails(field.name)(undefined)
                  }
                  setBlocked={setBlocked}
                  uploadEndpoint={uploadProfilePicture}
                  preferDownload={true}
                  cols={1}
                />
              ) : (
                <TextField
                  required={field.isRequired}
                  variant="outlined"
                  fullWidth
                  label={field.displayName}
                  defaultValue={profileDetails[field.name]}
                  onChange={unwrapEventValue(updateProfileDetails(field.name))}
                />
              )}
            </Grid>
          ))}
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
            <Button onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading || isBlocked}>
              Update
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
