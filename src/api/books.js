import axios from 'axios';
import { BASE_URL, failureWith, successWith, withAuth } from './base';

export const getSellingBooks = (onSuccess, onFailure, cancelToken) => {
  axios
    .get(`${BASE_URL}/books/selling`, withAuth({ cancelToken }))
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onFailure, 500, 401));
};

export const getSoldBooks = (onSuccess, onFailure, cancelToken) => {
  axios
    .get(`${BASE_URL}/books/sold`, withAuth({ cancelToken }))
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onFailure, 500, 401));
};
