import React, { useState } from 'react';
import { ClickAwayListener, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchResults from 'components/landing/SearchResults';
import SearchBar from 'components/landing/SearchBar';
import { useAxios } from 'hooks/axios';
import { debounce } from 'utils/functions';
import { searchBookBy } from 'api/books';

const useStyles = makeStyles((theme) => ({
  searchCard: {
    position: 'relative',
    borderRadius: 20,
    height: 'auto',
    // offset-x | offset-y | blur-radius | spread-radius
    '&:hover': {
      boxShadow: `0px 10px 25px -5px ${theme.palette.custom.shadowGray}`,
    },
  },
}));

export default function ExploreSearch() {
  const classes = useStyles();
  const [hideSearch, setHideSearch] = useState(true);
  const [fetch, cancelPrevious, data, , isLoading] = useAxios(
    searchBookBy,
    'searching'
  );

  const handleSearch = debounce((query) => {
    fetch(query);
    return () => cancelPrevious();
  }, 250);

  const showSearchResults = !hideSearch && data && data.length > 0;

  return (
    <ClickAwayListener onClickAway={() => setHideSearch(true)}>
      <Paper
        className={classes.searchCard}
        variant="outlined"
        onClick={() => setHideSearch(false)}
      >
        <SearchBar onSearching={handleSearch} isLoading={isLoading} />
        {showSearchResults && <SearchResults books={data} showSignup={false} />}
      </Paper>
    </ClickAwayListener>
  );
}
