import axios from 'axios';
import AuthProgress from 'screens/Login/authProgress';
import { BASE_URL, failureWith, successWith } from './base';

export const submitIdentity = (
  onProgress,
  onFailure,
  cancelToken,
  usernameOrEmail
) => {
  // Submit username or email and change auth progress according to whether
  // it exists.
  const onSuccess = (body) => {
    if (body.username) onProgress(AuthProgress.LOGIN);
    else onProgress(AuthProgress.SIGNUP);
  };
  axios
    .post(`${BASE_URL}/auth/check`, { usernameOrEmail })
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onFailure, 422, 500));
};

export const submitSignup = (onSuccess, onFailure, cancelToken, newUser) => {
  axios
    .post(`${BASE_URL}/auth/signup`, {
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    })
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onFailure, 422, 500));
};

export const submitLogin = (
  onSuccess,
  onFailure,
  cancelToken,
  usernameOrEmail,
  password
) => {
  axios
    .post(`${BASE_URL}/auth/login`, { usernameOrEmail, password })
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onFailure, 401, 422, 500));
};
