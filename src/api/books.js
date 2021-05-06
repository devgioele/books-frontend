import axios from 'axios';
import { auth, BASE_URL, failureWith, successWith } from './base';

export const confirmSell = (onSuccess, onFailure, cancelToken, transactionId) => {
  axios
    .post(`${BASE_URL}/books/sell/confirm/${transactionId}`, {}, auth({
      cancelToken,
    }))
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onFailure, 500, 422));
};

export const getBookByTransaction = (onSuccess, onFailure, cancelToken, transactionId) => {
  axios
    .get(`${BASE_URL}/books/by-transaction/${transactionId}`, auth({
      cancelToken,
    }))
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onFailure, 500, 422));
};
