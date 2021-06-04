import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

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

/**
 * More info: [https://material-ui.com/customization/default-theme/]
 */
export default responsiveFontSizes(
  createMuiTheme({
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
        main: '#b8afa8',
      },
      custom: {
        black: '#000000',
        shadowGray: '#dadada',
        linkBlue: '#2858f4',
        lightGrey: '#989898',
        facebook: '#1778F2',
        telegram: '#1778F2',
      },
    },
    typography: {
      h1: {
        fontFamily: 'Libre Baskerville',
      },
      h2: {
        fontFamily: 'Libre Baskerville',
      },
      h3: {
        fontFamily: 'Libre Baskerville',
      },
      h4: {
        fontFamily: 'Libre Baskerville',
      },
      h5: {
        fontFamily: 'Libre Baskerville',
      },
      h6: {
        fontFamily: 'Roboto',
      },
      body1: {
        fontFamily: 'Roboto',
      },
      body2: {
        fontFamily: 'Roboto',
      },
      subtitle1: {
        fontFamily: 'Roboto',
      },
      subtitle2: {
        fontFamily: 'Roboto',
      },
    },
    mixins: {
      // Like the mixins.toolbar of the default material UI theme
      navigator: {
        minHeight: '56px',
        '@media (min-width:0px) and (orientation: landscape)': {
          minHeight: '48px',
        },
        '@media (min-width:600px)': {
          minHeight: '64px',
        },
      },
    },
  })
);

export const pageFrame = (theme) => ({
  pageFrame: {
    [theme.breakpoints.up('xs')]: {
      padding: '20px 6%',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 10%',
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 10%',
    },
  },
});
