import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theming';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import ProvideAuth from './components/ProvideAuth';
import Routes from './components/routing/Routes';
import routes from './routing';

export default function Main() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <ProvideAuth>
          <Router>
            <Routes routes={routes} />
          </Router>
        </ProvideAuth>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}
