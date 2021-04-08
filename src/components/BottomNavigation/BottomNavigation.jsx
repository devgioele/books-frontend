import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = (width) => makeStyles({
  root: {
    width,
  },
})();

export default function SimpleBottomNavigation(props) {
  // eslint-disable-next-line react/prop-types
  const { sections, widthBreakpoint } = props;
  const classes = useStyles(widthBreakpoint);
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {sections.map((index, { label, icon }) => (
        <BottomNavigationAction key={index} label={label} icon={icon}/>
      ))}
    </BottomNavigation>
  );
}
