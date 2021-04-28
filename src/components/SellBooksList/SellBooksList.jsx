import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, CircularProgress, Grid, Link } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: -theme.spacing(2),
  },
  skeleton: {
    width: '100%',
  },
  bookContainer: {
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      borderStyle: 'solid',
      padding: theme.spacing(2),
    },
  },
  bookTitle: {
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
  },
  bookCover: {
    [theme.breakpoints.up('xs')]: {
      width: '100px',
    },
    [theme.breakpoints.up('md')]: {
      width: '120px',
    },
    height: 'auto',
    objectFit: 'scale-down',
    borderRadius: 5,
  },
  sellButton: {
    backgroundColor: fade(theme.palette.success.main, 0.2),
    '&:hover': {
      backgroundColor: fade(theme.palette.success.main, 0.5),
    },
    width: '100%',
    color: theme.palette.success.main,
  },
  editButton: {
    backgroundColor: fade(theme.palette.primary.dark, 0.2),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.dark, 0.5),
    },
    color: theme.palette.primary.dark,
    width: '100%',
  },
  removeButton: {
    backgroundColor: fade(theme.palette.error.main, 0.2),
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, 0.5),
    },
    color: theme.palette.error.main,
    width: '100%',
  },
  soldText: {
    textDecoration: 'line-through',
  },
}));

export default function SellBooksList({
  loadingSelling,
  loadingSold,
  sellingBooks,
  soldBooks,
  onEdit,
}) {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      spacing={4}
    >
      <Grid item xs={12}>
        <Grid
          container
          direction='column'
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography
              className={classes.sectionHeader}
              variant='h4'>
              Selling
            </Typography>
          </Grid>
          {loadingSelling ?
            <Grid item xs={12}>
              <CircularProgress
                variant='indeterminate'
                disableShrink
                color='secondary'
                size={20}
                thickness={4}
              />
            </Grid>
            :
            sellingBooks.map((sellingBook) => (
              <Grid key={sellingBook} item xs={12}>
                <Book isSold={false} book={sellingBook} onEdit={onEdit} />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction='column'
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography
              className={classes.sectionHeader}
              variant='h4'
            >
              Sold
            </Typography>
          </Grid>
          {loadingSold ?
            <Grid item xs={12}>
              <CircularProgress
                variant='indeterminate'
                disableShrink
                color='secondary'
                size={20}
                thickness={4}
              />
            </Grid>
            :
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
  onEdit,
}) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.bookContainer}
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
          <Grid className={classes.bookTitle} item>
            <Link
              variant='h6'
              color='inherit'
              href=''
            >
              <b>{book.title}</b>
            </Link>
          </Grid>
          <Grid className={isSold ? classes.soldText : {}} item>
            <Typography
              variant='h6'
            >
              {book.currency}{book.price}
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
                    <Grid item xs={12} sm={6}>
                      <Button
                        className={classes.editButton}
                        variant='contained'
                        disableElevation={true}
                        startIcon={<CreateIcon />}
                        onClick={() => onEdit(book)}
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        className={classes.removeButton}
                        variant='contained'
                        disableElevation={true}
                        startIcon={<DeleteForeverIcon />}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.sellButton}
                    variant='contained'
                    disableElevation={true}
                    startIcon={<ShareIcon />}
                  >
                    Share Sell Link
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
