import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ProfileHeader from 'components/profile/ProfileHeader';
import ProfileInformation from 'components/profile/ProfileInformation';
import { useAxios } from 'hooks/axios';
import { getProfileDetails } from 'api/profile';
import { PROFILE_ROUTE, renderRoute, toRoute } from 'routing/helpers';
import { buildObjectFromFields, getFromObject } from 'utils/functions';
import CompleteProfileBanner from 'components/profile/CompleteProfileBanner';
import { pageFrame } from 'theming';

const profileFields = [
  {
    displayName: 'Username',
    name: 'username',
    showInHeader: true,
  },
  {
    displayName: 'Name',
    name: 'name',
    showInHeader: true,
    showInEditDialog: true,
    space: 6,
  },
  {
    displayName: 'Surname',
    name: 'surname',
    showInHeader: true,
    showInEditDialog: true,
    space: 6,
  },
  {
    displayName: 'Picture',
    name: 'profilePicture',
    showInHeader: true,
    space: 12,
  },
  {
    displayName: 'Email',
    name: 'email',
    showInEditDialog: true,
    space: 12,
    isRequired: true,
  },
  {
    displayName: 'Phone Number',
    name: 'contactInformation.phoneNumber',
    showInEditDialog: true,
    space: 12,
  },
  {
    displayName: 'Telegram',
    name: 'contactInformation.telegramUsername',
    showInEditDialog: true,
    space: 12,
  },
  {
    displayName: 'Facebook',
    name: 'contactInformation.facebookUsername',
    showInEditDialog: true,
    space: 12,
  },
];

const useStyles = makeStyles((theme) => ({
  ...pageFrame(theme),
}));

const computeMissingFields = (zippedData) => {
  const validFields = zippedData
    .filter((field) => field.data)
    .reduce((acc, _) => acc + 1, 0);

  return parseInt((validFields / zippedData.length) * 100, 10);
};

export default function Profile({ routes }) {
  const classes = useStyles();
  const history = useHistory();

  const [
    fGetProfileDetails,
    cGetProfileDetails,
    profileDetails,
    ,
    isLoadingProfileDetails,
  ] = useAxios(getProfileDetails);

  const [editProfileRoute, editProfilePictureRoute] = routes;

  useEffect(() => {
    fGetProfileDetails();
    return () => cGetProfileDetails();
  }, []);

  const [zippedData, setZippedData] = useState(profileFields);
  useEffect(() => {
    setZippedData(
      zippedData.map((field) => ({
        ...field,
        data: getFromObject(profileDetails, field.name),
      }))
    );
  }, [setZippedData, profileDetails]);

  const [completePercentage, setCompletePercentage] = useState(100);
  useEffect(() => {
    setCompletePercentage(computeMissingFields(zippedData));
  }, [zippedData]);

  const backToProfile = (refresh) => {
    history.replace(toRoute(PROFILE_ROUTE));
    if (refresh) {
      cGetProfileDetails();
      fGetProfileDetails();
    }
  };

  return (
    <>
      {editProfileRoute &&
        renderRoute(editProfileRoute, {
          backToProfile,
          isDataLoaded: !!profileDetails,
          fields: zippedData.filter((field) => field.showInEditDialog),
        })}
      {editProfilePictureRoute &&
        renderRoute(editProfilePictureRoute, {
          backToProfile,
          isDataLoaded: !!profileDetails,
          profilePicture: profileDetails?.profilePicture,
        })}
      <Grid
        className={classes.pageFrame}
        container
        direction="column"
        spacing={4}
      >
        {isLoadingProfileDetails && (
          <Grid item>
            <CircularProgress />
          </Grid>
        )}
        {!isLoadingProfileDetails && profileDetails && (
          <>
            {completePercentage < 100 && (
              <Grid item>
                <CompleteProfileBanner progress={completePercentage} />
              </Grid>
            )}
            <Grid item>
              <ProfileHeader
                fields={zippedData.filter((field) => field.showInHeader)}
              />
            </Grid>
            <Grid item>
              <ProfileInformation
                fields={zippedData.filter((field) => !field.showInHeader)}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
