import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import VerticalRectangular from 'components/VerticalRectangular';

const useStyles = makeStyles((theme) => ({
  bookCover: {
    [theme.breakpoints.up('xs')]: {
      width: '100px',
      height: '150px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '133px',
      height: '200px',
    },
    boxShadow: `1px 1px 5px 1px ${theme.palette.custom.shadowGray}`,
  },
}));

export default function BookImages({ book }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {book?.pictures?.map((picture, index) => (
        <Grid key={index} item>
          <VerticalRectangular className={classes.bookCover}>
            <img src={picture} alt={`book cover ${index} of ${book.title}`} />
          </VerticalRectangular>
        </Grid>
      ))}
    </Grid>
  );
}
