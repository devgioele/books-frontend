import axios from 'axios';
import { BASE_URL, failureWith, successWith, withAuth } from './base';

const loadCurrencies = (onSuccess, onFailure, cancelToken) => {
  axios
    .get(
      `${BASE_URL}/currencies/all`,
      withAuth({
        cancelToken,
      })
    )
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure, 500));
};

export default loadCurrencies;
