import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Landing from 'components/Landing';
import theme from 'theming/index';

const landing = true;

export default function Main() {
  return (
    <MuiThemeProvider theme={theme}>
      <EntryPoint />
    </MuiThemeProvider>
  );
}

function EntryPoint() {
  return <>{landing ? <Landing /> : <Main />}</>;
}
