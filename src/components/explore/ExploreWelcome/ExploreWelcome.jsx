import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import girlTappingPhone from 'animations/girl-tapping-phone.json';
import { Typography } from '@material-ui/core';

export default function ExploreWelcome() {
  return (
    <div>
      <Typography variant={'body1'}>
        Here you will discover new books that best fit your preferences.
      </Typography>
      <Player
        autoplay
        loop
        keepLastFrame
        src={girlTappingPhone}
        style={{ height: '200px' }}
      />
    </div>
  );
}
