// Font used by Material-UI, in all the required weights
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import Main from 'Main.jsx';

ReactDOM.render(
  // Enable strict mode for debugging
  <React.StrictMode>
    <CssBaseline />
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
);
