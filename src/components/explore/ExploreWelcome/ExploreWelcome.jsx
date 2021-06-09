import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import girlTappingPhone from 'animations/girl-tapping-phone.json';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  girlAnimation: {
    height: '200px',
    [theme.breakpoints.up('sm')]: {
      height: '300px',
    },
    marginTop: 16,
  },
}));

export default function ExploreWelcome() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="body1">
        In this section, you will be able to search, discover new and engaging
        books. Immerse yourself into our collection and unleash the reading
        enthusiast in you!
      </Typography>
      <Player
        className={classes.girlAnimation}
        autoplay
        loop
        keepLastFrame
        src={girlTappingPhone}
      />
    </>
  );
}
