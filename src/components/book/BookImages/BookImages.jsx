import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bookCover: {
    width: 'auto',
    [theme.breakpoints.up('xs')]: {
      height: '150px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '200px',
    },
    height: 'auto',
    objectFit: 'scale-down',
    borderRadius: 6,
    boxShadow: `1px 1px 5px 1px ${theme.palette.custom.shadowGray}`,
  },
}));

export default function BookImages({ book }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {book?.pictures?.map((picture, index) => (
        <Grid key={index} item>
          <img className={classes.bookCover} src={picture} alt="book picture" />
        </Grid>
      ))}
    </Grid>
  );
}
