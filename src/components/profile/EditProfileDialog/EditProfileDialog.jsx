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
import { buildObjectFromFields, imprintObject } from '../../../utils/functions';
import useAxios from '../../../hooks/axios';
import { editProfile } from '../../../api/profile';

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

  const [fEditProfile, , , , isLoading] = useAxios(
    editProfile,
    'edit profile',
    () => backToProfile(true)
  );

  const updateProfileDetails = (fieldName) => (value) => {
    setProfileDetails({
      ...profileDetails,
      [fieldName]: value,
    });
  };

  const handleCancel = () => {
    backToProfile(false);
  };

  const handleUpdate = () => {
    fEditProfile(imprintObject(profileDetails));
  };

  if (!isDataLoaded) {
    handleCancel();
  }

  return (
    <Dialog fullScreen={false} fullWidth={true} open={true}>
      <DialogTitle>Update your profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          {fields.map((field, index) => (
            <Grid key={index} item xs={12}>
              <TextField
                required={field.isRequired}
                variant="outlined"
                fullWidth
                label={field.displayName}
                defaultValue={profileDetails[field.name]}
                onChange={unwrapEventValue(updateProfileDetails(field.name))}
              />
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
            <Button onClick={handleUpdate} disabled={isLoading}>
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
