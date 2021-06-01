import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BookImages from '../../components/book/BookImages';
import BookDetails from '../../components/book/BookDetails';
import BookSellerDetails from '../../components/book/BookSellerDetails';
import { pageFrame } from '../../theming';
import { useAxios } from '../../hooks/axios';
import { getBookById } from '../../api/books';
import DynamicAppBar from '../../components/DynamicAppBar';
import ContentWithToolbar from '../../components/ContentWithToolbar';

const useStyles = makeStyles((theme) => ({
  ...pageFrame(theme),
}));

export default function Book() {
  const classes = useStyles();

  const { id } = useParams();

  const [fGetBookById, cGetBookById, book, , isLoadingBook] = useAxios(
    getBookById
  );

  useEffect(() => {
    fGetBookById(id);
    return () => cGetBookById();
  }, []);

  return (
    <Grid container>
      <DynamicAppBar title={book?.title ?? 'Book'} showBack={true} />
      <ContentWithToolbar>
        <Grid className={classes.pageFrame} container spacing={4}>
          {isLoadingBook && (
            <Grid item>
              <CircularProgress />
            </Grid>
          )}
          {!isLoadingBook && book && (
            <>
              <Grid item xs={12}>
                <BookImages book={book} />
              </Grid>
              <Grid item xs={12}>
                <BookDetails book={book} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <BookSellerDetails book={book} />
              </Grid>
            </>
          )}
        </Grid>
      </ContentWithToolbar>
    </Grid>
  );
}
