import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { useAxios } from '../../../hooks/axios';
import { getProfileDetailsById } from '../../../api/profile';
import { getFromObject } from '../../../utils/functions';

const contactInformation = [
  {
    displayName: 'Email',
    name: 'email',
    style: 'emailButton',
    icon: <EmailIcon />,
    onClick: (email) => window.open(`mailto:${email}`, '_blank'),
  },
  {
    displayName: 'Phone Number',
    name: 'contactInformation.phoneNumber',
    style: 'phoneButton',
    icon: <PhoneIcon />,
    onClick: (phone) => window.open(`tel:${phone}`, '_blank'),
  },
  {
    displayName: 'Telegram',
    name: 'contactInformation.telegramUsername',
    style: 'telegramButton',
    icon: <TelegramIcon />,
    onClick: (username) => window.open(`https://t.me/${username}`, '_blank'),
  },
  {
    displayName: 'Facebook',
    name: 'contactInformation.facebookUsername',
    style: 'facebookButton',
    icon: <FacebookIcon />,
    onClick: (username) =>
      window.open(`https://www.facebook.com/${username}`, '_blank'),
  },
];

const customButton = (color, textColor = color) => ({
  backgroundColor: fade(color, 0.2),
  '&:hover': {
    backgroundColor: fade(color, 0.5),
  },
  color: textColor,
});

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
  },
  emailButton: customButton(theme.palette.error.main),
  phoneButton: customButton(theme.palette.success.main),
  telegramButton: customButton(theme.palette.custom.telegram),
  facebookButton: customButton(theme.palette.custom.facebook),
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
    <Grid container direction="column" spacing={3}>
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
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {contactInformation
        .filter((contactInfo) => getFromObject(seller, contactInfo.name))
        .map((contactInfo, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Button
              className={classes[contactInfo.style]}
              variant="contained"
              color="primary"
              disableElevation={true}
              fullWidth={true}
              startIcon={contactInfo.icon}
              onClick={() =>
                contactInfo.onClick(getFromObject(seller, contactInfo.name))
              }
            >
              {getFromObject(seller, contactInfo.name)}
            </Button>
          </Grid>
        ))}
    </Grid>
  );
}
