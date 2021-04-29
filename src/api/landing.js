import axios from 'axios';
import { BASE_URL, failureWith, successWith } from './base';

const landingSearchBy = (onSuccess, onFailure, cancelToken, searchQuery) => {
  axios
    .get(`${BASE_URL}/landing/search`, {
      params: { searchQuery },
      cancelToken,
    })
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onFailure, 500, 422));
};

export default landingSearchBy;
