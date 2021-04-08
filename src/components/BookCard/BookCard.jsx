import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookCover: {
    [theme.breakpoints.up('sm')]: {
      width: '70px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50px',
    },
    height: 'auto',
    objectFit: 'scale-down',
    borderRadius: 3,
    boxShadow: `1px 1px 5px 1px ${theme.colors.shadowGray}`,
    '&:hover': {
      borderWidth: 3,
      borderColor: theme.palette.primary.dark,
      borderStyle: 'solid',
    },
  },
}));

export default function BookCard(props) {
  const classes = useStyles();
  const { book } = props;

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Grid container justify="flex-start" alignItems="center" spacing={2}>
          <Grid item>
            <img
              className={classes.bookCover}
              src={book.cover}
              alt="book cover"
            />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item>
                <Typography variant="body1">
                  <b>{book.title}</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{book.isbn}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{book.condition}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          <b>{book.price}</b>
        </Typography>
      </Grid>
    </Grid>
  );
}
