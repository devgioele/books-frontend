import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "theming";
import {
  BrowserRouter as Router
} from "react-router-dom";
import routes from "./routing"
import ProvideAuth from "./components/ProvideAuth";
import Routes from "./components/Routes";

export default function Main() {
  return (
    <MuiThemeProvider theme={theme}>
      <ProvideAuth>
        <Router>
          <Routes routes={routes}/>
        </Router>
      </ProvideAuth>
    </MuiThemeProvider>
  );
}
