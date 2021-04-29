import axios from 'axios';
import AuthProgress from 'screens/Login/authProgress';
import { BASE_URL, failureWith, successWith } from './base';

// Submit username or email and change auth progress according to whether
// it exists.
export const submitIdentity = (
  onProgress,
  onFailure,
  cancelToken,
  usernameOrEmail
) => {
  const onSuccess = () => onProgress(AuthProgress.LOGIN);
  const onApparentFailure = (error) => {
    if (error.response?.status === 500) onProgress(AuthProgress.SIGNUP);
    else onFailure(error);
  };
  axios
    .post(`${BASE_URL}/auth/check`, { usernameOrEmail })
    .then(successWith(onSuccess, 200))
    .catch(failureWith(onApparentFailure, 422, 500));
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
