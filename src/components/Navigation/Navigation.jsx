import React, { useMemo } from 'react';
import DrawerLeft from 'components/DrawerLeft';
import { EXPLORE_ROUTE, PROFILE_ROUTE, SELL_ROUTE } from 'routing/helpers';
import { useMediaQuery } from '@material-ui/core';
import SimpleBottomNavigation from 'components/SimpleBottomNavigation';
import routeIsAncestor from 'utils/routing';
import {
  AccountCircleRounded,
  LocalLibraryRounded,
  MonetizationOnRounded,
} from '@material-ui/icons';

const sections = [
  {
    route: EXPLORE_ROUTE,
    label: 'Explore',
    icon: <LocalLibraryRounded />,
  },
  {
    route: SELL_ROUTE,
    label: 'Sell',
    icon: <MonetizationOnRounded />,
  },
  {
    route: PROFILE_ROUTE,
    label: 'Profile',
    icon: <AccountCircleRounded />,
  },
];

export default function Navigation({ children, selectedRoute, changeSection }) {
  const [selectedSection, selectedIndex] = useMemo(() => {
    const index = sections.findIndex((section) =>
      routeIsAncestor(section.route, selectedRoute)
    );
    return [sections[index], index];
  }, [selectedRoute]);
  const downXSmall = useMediaQuery((theme) =>
    theme.breakpoints.down(theme.breakpoints.values.smmd)
  );

  return (
    <div style={{ width: '100%' }}>
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
        <DrawerLeft
          title={selectedSection.label}
          content={children}
          selectedSection={selectedSection}
          selectedIndex={selectedIndex}
          sections={sections}
          changeSection={changeSection}
        />
      )}
    </div>
  );
}
