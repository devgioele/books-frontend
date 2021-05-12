import axios from 'axios';
import { BASE_URL, failureWith, successWith, withAuth } from './base';

// eslint-disable-next-line import/prefer-default-export
export const getProfileDetails = (onSuccess, onFailure, cancelToken) => {
  axios
    .get(`${BASE_URL}/profile/details`, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure));
};

export const editProfile = (
  onSuccess,
  onFailure,
  cancelToken,
  profileDetails
) => {
  axios
    .put(`${BASE_URL}/profile/edit`, profileDetails, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure, 422));
};
