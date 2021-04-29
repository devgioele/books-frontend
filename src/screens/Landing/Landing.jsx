import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, useMediaQuery } from '@material-ui/core';
import FeatureCard from 'components/landing/FeatureCard';
import LandingSearch from 'components/landing/LandingSearch';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LockIcon from '@material-ui/icons/Lock';
import HeartIcon from '@material-ui/icons/Favorite';
import LandingWelcome from 'components/landing/LandingWelcome';
import LandingHeader from 'components/landing/LandingHeader';
import LandingAbout from 'components/landing/LandingAbout';

const features = [
  {
    icon: <EmojiEmotionsIcon />,
    title: 'Simple',
    description:
      'Books has been designed to be simple and hassle free. Smart ' +
      'sections such as Explore give you the ability to easily discover new' +
      'books that may interest you.',
  },
  {
    icon: <MoneyOffIcon />,
    title: 'Free',
    description:
      "No ads and no fees. Books doesn't force you into a specific payment " +
      'or shipping method. Users have complete freedom of choice.',
  },
  {
    icon: <LockIcon />,
    title: 'Secure',
    description:
      'Privacy and security are our priorities. We do not store critical user' +
      ' information on our servers. Data collection is kept to the bare' +
      ' essential and is not shared with third parties.',
  },
  {
    icon: <HeartIcon />,
    title: 'Passion Driven',
    description:
      'Books has been developed by booklovers that were frustrated by ' +
      'current solutions on the market. We decided to jump ' +
      'on this challenge and to create the platform of our dreams.',
  },
];

const useStyles = makeStyles((theme) => ({
  pageFrame: {
    [theme.breakpoints.up('xs')]: {
      padding: '20px 6%',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 10%',
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 10%',
    },
  },
  page: {
    [theme.breakpoints.up('xs')]: {
      marginTop: '25px',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '50px',
    },
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  searchBar: {
    [theme.breakpoints.up('sm')]: {
      marginTop: -theme.spacing(4),
    },
  },
}));

export default function Landing() {
  const classes = useStyles();
  const downXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  return (
    <Grid className={classes.pageFrame}>
      <LandingHeader />
      <Grid
        className={classes.page}
        container
        direction="column"
        spacing={downXSmall ? 4 : 8}
      >
        <Grid item>
          <LandingWelcome />
        </Grid>

        <Grid item>
          <Typography className={classes.sectionTitle} variant="h4">
            Search an amazing book
          </Typography>
        </Grid>
        <Grid item className={classes.searchBar}>
          <LandingSearch />
        </Grid>

        <Grid item>
          <Typography className={classes.sectionTitle} variant="h4">
            Features
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={downXSmall ? 4 : 8}
            direction={downXSmall ? 'column' : 'row'}
            alignItems="flex-start"
            justify="center"
          >
            {features.map((feature, index) => (
              <Grid
                item
                key={index}
                // Show 1 feature per row
                xs={12}
                // Show 2-3 features per row
                sm={features.length % 3 === 0 ? 4 : 6}
                // Show 3-4 features per row
                lg={features.length % 4 === 0 ? 3 : 4}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item>
          <Typography className={classes.sectionTitle} variant="h4">
            About Us
          </Typography>
        </Grid>
        <Grid item>
          <LandingAbout />
        </Grid>
      </Grid>
    </Grid>
  );
}
