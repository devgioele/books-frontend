import React from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExploreSearch from 'components/explore/ExploreSearch';
import { pageFrame } from 'theming';
import PopularBooks from 'components/explore/PopularBooks';
import MayInterestYouBooks from 'components/explore/MayInterestYouBooks';
import RecentlyViewedBooks from 'components/explore/RecentlyViewedBooks';

const sections = [
  {
    title: 'Popular',
    component: PopularBooks,
  },
  {
    title: 'Search',
    component: ExploreSearch,
  },
  {
    title: 'May Interest You',
    component: MayInterestYouBooks,
  },
  {
    title: 'Recently Viewed',
    component: RecentlyViewedBooks,
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

  return (
    <Grid item xs={12}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography className={classes.sectionTitle} variant="h4">
            {section.title}
          </Typography>
        </Grid>
        <Grid item>
          <section.component />
        </Grid>
      </Grid>
    </Grid>
  );
}
