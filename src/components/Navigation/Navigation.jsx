import React, { useMemo } from 'react';
import PermanentDrawerLeft from 'components/PermanentDrawerLeft';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { EXPLORE_ROUTE, PROFILE_ROUTE, SELL_ROUTE } from 'routing/helpers';
import { useMediaQuery } from '@material-ui/core';
import SimpleBottomNavigation from 'components/SimpleBottomNavigation';

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

export default function Navigation({ children, selectedRoute, changeSection }) {
  const [selectedSection, selectedIndex] = useMemo(() => {
    const index = sections.findIndex(
      (section) => section.route === selectedRoute
    );
    return [sections[index], index];
  }, [selectedRoute]);
  const downXSmall = useMediaQuery((theme) =>
    theme.breakpoints.down(theme.breakpoints.values.smmd)
  );

  return (
    <>
      {downXSmall ? (
        <SimpleBottomNavigation
          title="Books"
          content={children}
          selectedSection={selectedSection}
          selectedIndex={selectedIndex}
          sections={sections}
          changeSection={changeSection}
        />
      ) : (
        <PermanentDrawerLeft
          title="Books"
          content={children}
          selectedSection={selectedSection}
          selectedIndex={selectedIndex}
          sections={sections}
          changeSection={changeSection}
        />
      )}
    </>
  );
}
