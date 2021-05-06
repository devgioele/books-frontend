import axios from 'axios';
import { BASE_URL, failureWith, successWith, withAuth } from './base';

export const getSellingBooks = (onSuccess, onFailure, cancelToken) => {
  axios
    .get(`${BASE_URL}/books/selling`, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure));
};

export const getSoldBooks = (onSuccess, onFailure, cancelToken) => {
  axios
    .get(`${BASE_URL}/books/sold`, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure));
};

export const sellBook = (onSuccess, onFailure, cancelToken, newBook) => {
  axios
    .post(`${BASE_URL}/books/sell`, newBook, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure, 422));
};

export const editBook = (
  onSuccess,
  onFailure,
  cancelToken,
  bookId,
  newBook
) => {
  axios
    .put(`${BASE_URL}/books/edit/${bookId}`, newBook, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure, 422));
};

export const removeBook = (onSuccess, onFailure, cancelToken, bookId) => {
  axios
    .delete(`${BASE_URL}/books/remove/${bookId}`, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure));
};
