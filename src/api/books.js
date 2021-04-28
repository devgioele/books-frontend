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

// TODO: swap with real API call.
// eslint-disable-next-line no-unused-vars
export const getSellingBooks = (onSuccess, onFailure, cancelToken) => {
  setTimeout(() => onSuccess([sampleBook, sampleBook, sampleBook]), 400);
};

// TODO: swap with real API call.
// eslint-disable-next-line no-unused-vars
export const getSoldBooks = (onSuccess, onFailure, cancelToken) => {
  setTimeout(() => onSuccess([sampleBook]), 400);
};
