import axios from 'axios';
import { BASE_URL, failureWith, successWith, withAuth } from './base';

export const getProfileDetails = (onSuccess, onFailure, cancelToken) => {
  axios
    .get(`${BASE_URL}/profile/details`, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure));
};

export const getProfileDetailsById = (
  onSuccess,
  onFailure,
  cancelToken,
  userId
) => {
  axios
    .get(`${BASE_URL}/profile/details/${userId}`, withAuth({ cancelToken }))
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
    .catch(failureWith(onFailure));
};

export const uploadProfilePicture = (
  onSuccess,
  onFailure,
  cancelToken,
  file
) => {
  const fd = new FormData();
  fd.append('profile-picture', file, file.name);
  axios
    .post(`${BASE_URL}/profile/picture/upload`, fd, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure, 415, 500));
};

export const removeProfilePicture = (onSuccess, onFailure, cancelToken) => {
  axios
    .delete(`${BASE_URL}/profile/picture/remove`, withAuth({ cancelToken }))
    .then(successWith(onSuccess, onFailure, 200))
    .catch(failureWith(onFailure, 415, 500));
};
