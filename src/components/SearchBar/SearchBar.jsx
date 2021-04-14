import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
    fontSize: 19,
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1.5)}px)`,
    width: '100%',
    fontFamily: theme.typography.fontFamily,
  },
  search: {
    position: 'relative',
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  searchIconContainer: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    color: fade(theme.colors.black, 0.4),
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const { onSearching } = props;

  return (
    <div className={classes.search}>
      <div className={classes.searchIconContainer}>
        <SearchIcon className={classes.searchIcon} />
      </div>
      <InputBase
        autoFocus
        placeholder="Search by isbn, title, description"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event) => onSearching(event.target.value)}
        onFocus={(event) => onSearching(event.target.value)}
      />
    </div>
  );
}
