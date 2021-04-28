import axios from 'axios';
import AuthProgress from 'screens/Login/authProgress';
import { BASE_URL } from './base';

const errorStatuses = [301, 422, 500];

axios.interceptors.response.use((response) => {
  if (errorStatuses.includes(response.status)) return Promise.reject(response);
  return response;
});

export const submitIdentity = (onProgress, onFailure, usernameOrEmail) => {
  // Submit username or email and change auth progress according to whether
  // it exists.
  axios
    .post(`${BASE_URL}/auth/check`, { usernameOrEmail })
    .then((response) => {
      if (response.status === 200) {
        onProgress(AuthProgress.LOGIN);
      } else {
        throw new Error(`Unexpected response: ${response.status}!`);
      }
    })
    .catch((error) => {
      switch (error.response?.status) {
        case 500:
          onProgress(AuthProgress.SIGNUP);
          break;
        case 422:
          onFailure();
          break;
        default:
          throw error;
      }
    });
};

export const submitLogin = (
  onSuccess,
  onFailure,
  usernameOrEmail,
  password,
) => {
  axios
    // Submit username and password
    .post(`${BASE_URL}/auth/login`, {
      usernameOrEmail,
      password,
    })
    // If correct, redirect using onSuccess
    .then((response) => {
      if (response.status === 200) {
        onSuccess();
      } else {
        throw new Error(`Unexpected response: ${response.status}!`);
      }
    })
    // Report error
    .catch((error) => {
      if (error.response?.status === 401) {
        onFailure();
      } else {
        throw error;
      }
    });
};

export const submitSignup = (onSuccess, onFailure, newUser) => {
  axios
    // Submit new user data
    .post(`${BASE_URL}/auth/signup`, {
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    })
    // If successfully signed up, redirect using onSuccess
    .then((response) => {
      if (response.status === 200) {
        onSuccess();
      } else {
        throw new Error(`Unexpected response: ${response.status}!`);
      }
    })
    // Report error
    .catch((error) => {
      if (error.response?.status === 401) {
        onFailure();
      } else {
        throw error;
      }
    });
};
