import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Routes from '../../components/Routes';
import Navigation from '../../components/Navigation';

export default function Dashboard({ routes }) {
  const history = useHistory();
  const location = useLocation();

  const changeSection = (newSection) => {
    history.push(newSection);
  };

  return (
    <Navigation selectedRoute={location.pathname} changeSection={changeSection}>
      <Routes routes={routes} />
    </Navigation>
  );
}
