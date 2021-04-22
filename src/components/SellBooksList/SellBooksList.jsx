import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Link } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    fontStyle: 'bold',
  },
  bookCover: {
    [theme.breakpoints.up('xs')]: {
      width: '50px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '120px',
    },
    height: 'auto',
    objectFit: 'scale-down',
    borderRadius: 3,
  },
  sellButton: {
    borderColor: theme.palette.success.main,
    color: theme.palette.success.main,
    width: '100%',
  },
  editButton: {
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    width: '100%',
  },
  removeButton: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
    width: '100%',
  },
}));

export default function SellBooksList({
  loadingSelling,
  loadingSold,
  sellingBooks,
  soldBooks,
}) {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      spacing={3}>
      <Grid item xs={12}>
        <Grid
          container
          direction='column'
          spacing={2}>
          <Grid item xs={12}>
            <Typography
              className={classes.sectionHeader}
              variant='h4'>
              Selling
            </Typography>
          </Grid>
          {loadingSelling ?
            <p>Loading selling books</p> :
            sellingBooks.map((sellingBook) => (
              <Grid key={sellingBook} item xs={12}>
                <Book isSold={false} book={sellingBook} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction='column'
          spacing={2}>
          <Grid item xs={12}>
            <Typography
              className={classes.sectionHeader}
              variant='h4'
            >
              Sold
            </Typography>
          </Grid>
          {loadingSold ?
            <p>Loading sold books</p> :
            soldBooks.map((soldBook) => (
              <Grid key={soldBook} item xs={12}>
                <Book isSold={true} book={soldBook} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

function Book({
  // eslint-disable-next-line no-unused-vars
  isSold,
  book,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      justify='flex-start'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <img
          className={classes.bookCover}
          src={book.pictures[0]}
          alt='book cover'
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='flex-start'
          spacing={1}
        >
          <Grid item>
            <Link
              variant='body1'
              color='inherit'
              href=''
            >
              <b>{book.title}</b>
            </Link>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
            >
              {book.currency} {book.price}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='body1'
            >
              Publication date: {book.publicationDate.toString()}
            </Typography>
          </Grid>
          {!isSold && (
            <Grid style={{ width: '100%' }} item>
              <Grid
                container
                direction='column'
                spacing={1}
              >
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        className={classes.sellButton}
                        variant='outlined'
                        startIcon={<CheckIcon />}>
                        Sell
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        className={classes.editButton}
                        variant='outlined'
                        startIcon={<CreateIcon />}>
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.removeButton}
                    variant='outlined'
                    startIcon={<DeleteForeverIcon />}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
