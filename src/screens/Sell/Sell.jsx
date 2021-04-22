import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import SellBooksList from '../../components/SellBooksList';

const sampleBook = {
  isbn: '978-1-56619-909-4',
  title: 'Alice in Wonderland',
  description:
    'Alice in Wonderland has been known for its curious story.',
  currency: '$',
  price: 20,
  condition: 'ok',
  pictures: ['https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/63fc5679081483.5cb7f1e0aa619.png'],
  publicationDate: '3rd May 2020',
  seller: 'riccardo',
  locationName: 'Trento',
  locationLatitude: 46.0747793,
  locationLongitude: 11.3547582,
  saleDate: new Date(),
  buyer: 'marco',
};

function fetchSellingBooks(done) {
  const sellingBooks = [sampleBook, sampleBook];
  setTimeout(() => done(sellingBooks), 1000);
}

function fetchSoldBooks(done) {
  const soldBooks = [sampleBook];
  setTimeout(() => done(soldBooks), 100);
}

export default function Sell() {
  const [isLoadingSelling, setLoadingSelling] = useState(false);
  const [isLoadingSold, setLoadingSold] = useState(false);
  const [sellingBooks, setSellingBooks] = useState([]);
  const [soldBooks, setSoldBooks] = useState([]);

  useEffect(() => {
    setLoadingSelling(true);
    fetchSellingBooks((books) => {
      setSellingBooks(books);
      setLoadingSelling(false);
    });
  }, [setLoadingSelling, setSellingBooks]);

  useEffect(() => {
    setLoadingSold(true);
    fetchSoldBooks((books) => {
      setSoldBooks(books);
      setLoadingSold(false);
    });
  }, [setLoadingSold, setSoldBooks]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <SellBooksList
          loadingSelling={isLoadingSelling}
          loadingSold={isLoadingSold}
          sellingBooks={sellingBooks}
          soldBooks={soldBooks}
        />
      </Grid>
    </Grid>
  );
}
