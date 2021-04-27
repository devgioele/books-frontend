import React from 'react';
import { ClickAwayListener, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchResults from 'components/landing/SearchResults';
import SearchBar from 'components/landing/SearchBar';
import { landingSearchBy } from '../../../api/landing';
import { useAxios } from '../../../hooks/axios';
import { debounce } from '../../../utils/functions';

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
  // eslint-disable-next-line no-unused-vars
  const [fetch, cancelPrevious, data, error, isLoading] = useAxios(landingSearchBy);

  const handleSearch = debounce((query) => {
    cancelPrevious();
    fetch(query);
  }, 250);

  const showSearchResults = data && data.length > 0;

  return (
    <ClickAwayListener onClickAway={() => {
    }}>
      <Paper className={classes.searchCard} variant='outlined'>
        <SearchBar onSearching={handleSearch} isLoading={isLoading} />
        {showSearchResults && <SearchResults books={data} />}
      </Paper>
    </ClickAwayListener>
  );
}
