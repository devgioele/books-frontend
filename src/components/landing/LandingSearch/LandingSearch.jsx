import React from 'react';
import { ClickAwayListener, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchResults from 'components/landing/SearchResults';
import SearchBar from 'components/landing/SearchBar';
import landingSearchBy from 'api/landing';
import debounce from 'utils/functions';
import useStatefulSnackbar from 'hooks/snackbar';
import useAxios from 'hooks/axios';

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
  const [fetch, cancelPrevious, data, error, isLoading] = useAxios(
    landingSearchBy
  );
  useStatefulSnackbar(error, 'An error occurred while searching', 'error');

  const handleSearch = debounce((query) => {
    cancelPrevious();
    fetch(query);
  }, 200);

  const showSearchResults = data && data.length > 0;

  return (
    <ClickAwayListener onClickAway={() => {}}>
      <Paper className={classes.searchCard} variant="outlined">
        <SearchBar onSearching={handleSearch} isLoading={isLoading} />
        {showSearchResults && <SearchResults books={data} />}
      </Paper>
    </ClickAwayListener>
  );
}
