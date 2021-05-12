import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileInformation from '../../components/profile/ProfileInformation';
import useAxios from '../../hooks/axios';
import { getProfileDetails } from '../../api/profile';
import { PROFILE_ROUTE, renderRoute, toRoute } from '../../routing/helpers';
import { getFromObject } from '../../utils/functions';
import CompleteProfileBanner from '../../components/profile/CompleteProfileBanner';

// TODO: add required fields.
const profileFields = [
  {
    displayName: 'Name',
    name: 'name',
    showInHeader: true,
    showInEditDialog: true,
  },
  {
    displayName: 'Surname',
    name: 'surname',
    showInHeader: true,
    showInEditDialog: true,
  },
  {
    displayName: 'Picture',
    name: 'profilePicture',
    showInHeader: true,
    showInEditDialog: false,
  },
  {
    displayName: 'Email',
    name: 'email',
    showInHeader: false,
    showInEditDialog: true,
  },
  {
    displayName: 'Phone Number',
    name: 'contactInformation.phoneNumber',
    showInHeader: false,
    showInEditDialog: true,
  },
  {
    displayName: 'Telegram',
    name: 'contactInformation.telegramUsername',
    showInHeader: false,
    showInEditDialog: true,
  },
  {
    displayName: 'Facebook',
    name: 'contactInformation.facebookUsername',
    showInHeader: false,
    showInEditDialog: true,
  },
];

const computeMissingFields = (zippedData) => {
  const validFields = zippedData
    .filter((field) => field.data)
    .reduce((acc, _) => acc + 1, 0);

  return parseInt((validFields / zippedData.length) * 100, 10);
};

export default function Profile({ routes }) {
  const history = useHistory();

  const [
    fGetProfileDetails,
    cGetProfileDetails,
    profileDetails,
    ,
    isLoadingProfileDetails,
  ] = useAxios(getProfileDetails);

  const [editProfileRoute] = routes;

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
      <Grid container direction="column" spacing={4}>
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
