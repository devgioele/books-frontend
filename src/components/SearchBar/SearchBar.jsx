import React, { useState } from 'react';
import { InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchResults from 'components/SearchResults';

const useStyles = makeStyles((theme) => ({
  searchCard: {
    position: 'relative',
    borderRadius: 20,
    height: 'auto',
    // offset-x | offset-y | blur-radius | spread-radius
    boxShadow: `0px 1px 3px 0px ${theme.colors.shadowGray}`,
    '&:hover': {
      boxShadow: `0px 10px 25px -5px ${theme.colors.shadowGray}`,
    },
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
}));

export default function SearchBar() {
  const classes = useStyles();
  const [searchedText, setSearchedText] = useState('');
  const [searching, setSearching] = useState(false);

  return (
    <Paper className={classes.searchCard} variant="outlined">
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
          onChange={(event) => {
            setSearchedText(event.target.value);
            setSearching(event.target.value.length > 0);
          }}
          onFocus={() => setSearching(searchedText !== '')}
          onBlur={() => setSearching(false)}
        />
      </div>
      {searching && <SearchResults />}
    </Paper>
  );
}
