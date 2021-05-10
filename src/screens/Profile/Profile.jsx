import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileInformation from '../../components/profile/ProfileInformation';
import useAxios from '../../hooks/axios';
import { getProfileDetails } from '../../api/profile';
import { renderRoute } from '../../routing/helpers';
import { getFromObject } from '../../utils/functions';
import CompleteProfileBanner from '../../components/profile/CompleteProfileBanner';

const profileFields = [
  {
    title: 'Name',
    value: 'name',
    showInHeader: true,
  },
  {
    title: 'Surname',
    value: 'surname',
    showInHeader: true,
  },
  {
    title: 'Picture',
    value: 'profilePicture',
    showInHeader: true,
  },
  {
    title: 'Email',
    value: 'email',
    showInHeader: false,
  },
  {
    title: 'Phone Number',
    value: 'contactInformation.phoneNumber',
    showInHeader: false,
  },
  {
    title: 'Telegram',
    value: 'contactInformation.telegramUsername',
    showInHeader: false,
  },
  {
    title: 'Facebook',
    value: 'contactInformation.facebookUsername',
    showInHeader: false,
  },
];

const computeMissingFields = (zippedData) => {
  const validFields = zippedData
    .filter((field) => field.data)
    .reduce((acc, _) => acc + 1, 0);

  return parseInt((validFields / zippedData.length) * 100, 10);
};

export default function Profile({ routes }) {
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
        data: getFromObject(profileDetails, field.value),
      }))
    );
  }, [setZippedData, profileDetails]);

  const [completePercentage, setCompletePercentage] = useState(100);
  useEffect(() => {
    setCompletePercentage(computeMissingFields(zippedData));
  }, [zippedData]);

  return (
    <>
      {editProfileRoute && renderRoute(editProfileRoute)}
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
