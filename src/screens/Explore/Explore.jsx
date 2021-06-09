import React, { useEffect } from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExploreSearch from 'components/explore/ExploreSearch';
import { pageFrame } from 'theming';
import PopularBooks from 'components/explore/PopularBooks';
import { useAxios } from 'hooks/axios';
import { exploreBooks } from 'api/books';
import MayInterestYouBooks from 'components/explore/MayInterestYouBooks';
import RecentlyViewedBooks from 'components/explore/RecentlyViewedBooks';
import ExploreWelcome from 'components/explore/ExploreWelcome';

const sections = [
  {
    title: 'Welcome to the explore page',
    component: ExploreWelcome,
    getBooks: (data) =>
      data?.popular?.length +
        data?.mayInterestYou?.length +
        data?.recentlyViewed?.length ===
      0,
  },
  {
    title: 'Popular',
    component: PopularBooks,
    getBooks: (data) => data?.popular?.length > 0 && data?.popular,
  },
  {
    title: 'Search',
    component: ExploreSearch,
  },
  {
    title: 'May interest you',
    component: MayInterestYouBooks,
    getBooks: (data) =>
      data?.mayInterestYou?.length > 0 && data?.mayInterestYou,
  },
  {
    title: 'Recently viewed',
    component: RecentlyViewedBooks,
    getBooks: (data) =>
      data?.recentlyViewed?.length > 0 && data?.recentlyViewed,
  },
];

const useStyles = makeStyles((theme) => ({
  ...pageFrame(theme),
  sectionTitle: {
    fontWeight: 'bold',
  },
}));

export default function Explore() {
  const classes = useStyles();
  const downXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  return (
    <Grid className={classes.pageFrame} container spacing={downXSmall ? 3 : 6}>
      {sections.map((section, index) => (
        <Section key={index} section={section} />
      ))}
    </Grid>
  );
}

function Section({ section }) {
  const classes = useStyles();

  const [fExploreBooks, cExploreBooks, data, ,] = useAxios(
    exploreBooks,
    'fetching books to explore'
  );

  useEffect(() => {
    fExploreBooks();
    return () => cExploreBooks();
  }, []);

  const sectionContainsBooks = !!section.getBooks;
  const books = sectionContainsBooks && section.getBooks(data);

  return (
    ((!sectionContainsBooks || books) && (
      <Grid item xs={12}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography className={classes.sectionTitle} variant="h4">
              {section.title}
            </Typography>
          </Grid>
          <Grid item>
            <section.component books={books} />
          </Grid>
        </Grid>
      </Grid>
    )) ||
    null
  );
}
