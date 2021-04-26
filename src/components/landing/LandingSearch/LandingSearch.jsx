import React, { useState } from 'react';
import { ClickAwayListener, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchResults from 'components/landing/SearchResults';
import SearchBar from 'components/landing/SearchBar';

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
}));

export default function LandingSearch() {
  const classes = useStyles();
  const [searchedText, setSearchedText] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = (text) => {
    setSearchedText(text);
    setSearching(text.length > 0);
  };

  return (
    <ClickAwayListener onClickAway={() => handleSearch('')}>
      <Paper className={classes.searchCard} variant="outlined">
        <SearchBar onSearching={handleSearch} />
        {searching && <SearchResults query={searchedText} />}
      </Paper>
    </ClickAwayListener>
  );
}
