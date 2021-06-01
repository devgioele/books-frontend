import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAxios } from '../../../hooks/axios';
import { getProfileDetailsById } from '../../../api/profile';
import { getFromObject } from '../../../utils/functions';

const contactInformation = [
  {
    displayName: 'Email',
    name: 'email',
    onClick: (email) => window.open(`mailto:${email}`, '_blank'),
  },
  {
    displayName: 'Phone Number',
    name: 'contactInformation.phoneNumber',
    onClick: (phone) => window.open(`tel:${phone}`, '_blank'),
  },
  {
    displayName: 'Telegram',
    name: 'contactInformation.telegramUsername',
    onClick: (username) => window.open(`https://t.me/${username}`, '_blank'),
  },
  {
    displayName: 'Facebook',
    name: 'contactInformation.facebookUsername',
    onClick: (username) =>
      window.open(`https://www.facebook.com/${username}`, '_blank'),
  },
];

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function BookSellerDetails({ book }) {
  const classes = useStyles();

  const [
    fGetProfileDetailsById,
    cGetProfileDetailsById,
    seller,
    ,
    isLoadingUser,
  ] = useAxios(getProfileDetailsById);

  useEffect(() => {
    fGetProfileDetailsById(book.seller);
    return () => cGetProfileDetailsById();
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      {isLoadingUser && (
        <Grid item>
          <CircularProgress />
        </Grid>
      )}
      {!isLoadingUser && seller && (
        <>
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar
                  className={classes.avatar}
                  src={seller.profilePicture}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">Sold by {seller.username}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ContactInformation seller={seller} />
          </Grid>
        </>
      )}
    </Grid>
  );
}

function ContactInformation({ seller }) {
  return (
    <Grid container spacing={3}>
      {contactInformation
        .filter((contactInfo) => getFromObject(seller, contactInfo.name))
        .map((contactInfo, index) => (
          <Grid key={index} item xs={12}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="body1">
                  {contactInfo.displayName}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation={true}
                  onClick={() =>
                    contactInfo.onClick(getFromObject(seller, contactInfo.name))
                  }
                >
                  {getFromObject(seller, contactInfo.name)}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}
