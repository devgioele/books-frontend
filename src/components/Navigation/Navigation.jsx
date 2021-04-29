import React, { useMemo } from 'react';
import PermanentDrawerLeft from 'components/PermanentDrawerLeft';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { EXPLORE_ROUTE, PROFILE_ROUTE, SELL_ROUTE } from 'routing/helpers';

const sections = [
  {
    route: EXPLORE_ROUTE,
    label: 'Explore',
    icon: <ExploreIcon />,
  },
  {
    route: SELL_ROUTE,
    label: 'Sell',
    icon: <ImportContactsIcon />,
  },
  {
    route: PROFILE_ROUTE,
    label: 'Profile',
    icon: <AccountCircleIcon />,
  },
];

export default function Navigation({
  children,
  selectedRoute,
  changeSection,
}) {
  // eslint-disable-next-line no-unused-vars
  const selectedSection = useMemo(() =>
      sections.filter((section) => section.route === selectedRoute)[0],
    [selectedRoute]);

  return (
    <PermanentDrawerLeft
      title='Books'
      content={children}
      selectedSection={selectedSection}
      sections={sections}
      changeSection={changeSection}
    />
  );
}
