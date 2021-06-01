import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAxios } from 'hooks/axios';
import { exploreBooks } from 'api/books';
import BooksGallery from 'components/explore/BooksGallery';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '200px',
  },
  book: {
    width: '300px',
    height: '300px',
  },
  bookCard: {
    padding: theme.spacing(2),
  },
  bookTitle: {
    fontWeight: 'bold',
  },
  bookImage: {
    width: 'auto',
    [theme.breakpoints.up('xs')]: {
      height: '100px',
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

export default function MayInterestYouBooks() {
  const classes = useStyles();

  const [fExploreBooks, cExploreBooks, data, ,] = useAxios(exploreBooks);

  useEffect(() => {
    fExploreBooks();
    return () => cExploreBooks();
  }, []);

  return <BooksGallery books={data?.mayInterestYou} />;
}
