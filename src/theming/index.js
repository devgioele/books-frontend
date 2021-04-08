import { createMuiTheme } from '@material-ui/core/styles';

/**
 <color name="primaryColor">#eae1da</color>
 <color name="primaryLightColor">#ffffff</color>
 <color name="primaryDarkColor">#b8afa8</color>
 <color name="secondaryColor">#ffd54f</color>
 <color name="secondaryLightColor">#ffff81</color>
 <color name="secondaryDarkColor">#c8a415</color>
 <color name="primaryTextColor">#000000</color>
 <color name="secondaryTextColor">#000000</color>
 */

export default createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      smmd: 800,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#eae1da',
    },
    secondary: {
      main: '#ffd54f',
    },
  },
  typography: {
    fontFamily: 'Libre Baskerville',
    body1: {
      fontFamily: 'Roboto',
    },
    body2: {
      fontFamily: 'Roboto',
    },
    subtitle1: {
      fontFamily: 'Roboto',
    },
  },
  colors: {
    black: '#000000',
    shadowGray: '#dadada',
  },
});
