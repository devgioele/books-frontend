import React, { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileInformation from '../../components/profile/ProfileInformation';
import useAxios from '../../hooks/axios';
import { getProfileDetails } from '../../api/profile';

export default function Profile() {
  const [
    fGetProfileDetails,
    cGetProfileDetails,
    profileDetails,
    profileDetailsError,
    isLoadingProfileDetails,
  ] = useAxios(getProfileDetails);

  useEffect(() => {
    fGetProfileDetails();
    return () => cGetProfileDetails();
  }, []);

  return (
    <Grid container direction="column" spacing={4}>
      {isLoadingProfileDetails && <CircularProgress />}
      {!isLoadingProfileDetails && profileDetails && (
        <>
          <Grid item>
            <ProfileHeader profile={profileDetails} />
          </Grid>
          <Grid item>
            <ProfileInformation profile={profileDetails} />
          </Grid>
        </>
      )}
    </Grid>
  );
}
