import React from 'react';
import { Button, Divider, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { EXPLORE_ROUTE, toRoute } from 'routing/helpers';
import BookCard from '../../BookCard';

const useStyles = makeStyles((theme) => ({
  searchResults: {
    position: 'absolute',
    borderRadius: 10,
    width: '100%',
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    // offset-x | offset-y | blur-radius | spread-radius
    '&:hover': {
      boxShadow: `0px 20px 25px -5px ${theme.colors.shadowGray}`,
    },
  },
}));

export default function SearchResults({ books, showSignup }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper className={classes.searchResults} variant="outlined">
      <Grid
        container
        spacing={3}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        {books.map((book, index) => (
          <Grid
            item
            key={index}
            onClick={() => history.push(toRoute(EXPLORE_ROUTE))}
          >
            <BookCard book={book} />
          </Grid>
        ))}
        {showSignup && (
          <>
            <Divider light />
            <Grid item>
              <SeeMore />
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
}

function SeeMore() {
  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Typography variant="body1">Interested in these books?</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disableElevation={true}
          onClick={() => history.push(toRoute(EXPLORE_ROUTE))}
        >
          Sign up for free
        </Button>
      </Grid>
    </Grid>
  );
}
