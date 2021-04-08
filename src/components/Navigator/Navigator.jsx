import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import PermanentDrawerLeft from 'components/PermanentDrawerLeft';
import SimpleBottomNavigation from 'components/BottomNavigation';
import { Add, Explore, Info } from '@material-ui/icons';

const sections = [
  {
    label: 'Explore',
    icon: (<Explore/>),
  },
  {
    label: 'Sell',
    icon: (<Add/>),
  },
  {
    label: 'LandingAbout',
    icon: (<Info/>),
  },
];

const widthBreakpoint = 600;

export default function Navigator() {
  const isDesktop = useMediaQuery(`(min-width:${widthBreakpoint}px)`);

  return isDesktop
    ? (<PermanentDrawerLeft sections={sections} title='Books'/>)
    : (<SimpleBottomNavigation sections={sections}
                             widthBreakpoint={widthBreakpoint}/>);
}
