import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Link } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ShareIcon from '@material-ui/icons/Share';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Skeleton } from '@material-ui/lab';
import formatStringDate from 'utils/dates';

const useStyles = makeStyles((theme) => ({
  sectionGrid: {
    marginTop: -theme.spacing(3),
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: -theme.spacing(1),
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
  sellingText: {},
  soldText: {
    textDecoration: 'line-through',
  },
  skeletonCover: {
    [theme.breakpoints.up('xs')]: {
      width: '100px',
      height: '160px',
    },
    [theme.breakpoints.up('md')]: {
      width: '120px',
      height: '180px',
    },
  },
  skeletonTitle: {
    [theme.breakpoints.up('sm')]: {
      width: '400px',
    },
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
  },
  skeletonSubtitle: {
    [theme.breakpoints.up('sm')]: {
      width: '200px',
    },
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
}));

export default function SellBooksList({
  loadingSelling,
  loadingSold,
  sellingBooks,
  soldBooks,
  onEdit,
  onRemove,
  onSellLink,
}) {
  const classes = useStyles();

  const sections = [
    {
      title: 'Selling',
      data: sellingBooks,
      isLoading: loadingSelling,
      isSold: false,
      showSection: loadingSelling || sellingBooks.length > 0,
    },
    {
      title: 'Sold',
      data: soldBooks,
      isLoading: loadingSold,
      isSold: true,
      showSection: loadingSold || soldBooks.length > 0,
    },
  ];

  return (
    <Grid container direction="column" alignItems="center" spacing={4}>
      {sections
        .filter((section) => section.showSection)
        .map((section, sectionIndex) => (
          <Grid key={sectionIndex} item>
            <Grid
              container
              className={classes.sectionGrid}
              direction="column"
              spacing={4}
            >
              <Grid item>
                <Typography
                  className={classes.sectionHeader}
                  elevation={15}
                  variant="h4"
                >
                  {section.title}
                </Typography>
              </Grid>
              {section.isLoading ? (
                <Grid item>
                  <SkeletonBook isSold={section.isSold} />
                </Grid>
              ) : (
                section.data.map((book, bookIndex) => (
                  <Grid key={bookIndex} item>
                    <Book
                      isSold={section.isSold}
                      book={book}
                      onEdit={onEdit}
                      onRemove={onRemove}
                      onSellLink={onSellLink}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

function Book({ isSold, book, onEdit, onRemove, onSellLink }) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.bookContainer}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <img
          className={classes.bookCover}
          src={book.pictures[0]}
          alt="book cover"
        />
      </Grid>
      <Grid item xs={8}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid className={classes.bookTitle} item>
            <Link variant="h6" color="inherit">
              <b>{book.title}</b>
            </Link>
          </Grid>
          <Grid
            className={isSold ? classes.soldText : classes.sellingText}
            item
          >
            <Typography variant="h6">
              {`${book.currency} ${book.price}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {isSold
                ? `Sold to ${book.buyer} on ${formatStringDate(book.saleDate)}`
                : `Publication date: ${formatStringDate(book.publicationDate)}`}
            </Typography>
          </Grid>
          {!isSold && (
            <Grid style={{ width: '100%' }} item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        className={classes.editButton}
                        variant="contained"
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
                        variant="contained"
                        disableElevation={true}
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => onRemove(book)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.sellButton}
                    variant="contained"
                    disableElevation={true}
                    startIcon={<ShareIcon />}
                    onClick={() => onSellLink(book)}
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

function SkeletonBook({ isSold }) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.bookContainer}
      container
      justify="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Skeleton className={classes.skeletonCover} variant="rect" />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid className={classes.skeletonTitle} item>
            <Typography variant="h6">
              <Skeleton />
            </Typography>
          </Grid>
          <Grid className={classes.skeletonSubtitle} item>
            <Typography variant="h6">
              <Skeleton />
            </Typography>
          </Grid>
          <Grid className={classes.skeletonSubtitle} item>
            <Typography variant="body1">
              <Skeleton />
            </Typography>
          </Grid>
          {!isSold && (
            <Grid style={{ width: '100%' }} item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Skeleton variant="rect" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Skeleton variant="rect" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Skeleton variant="rect" />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
