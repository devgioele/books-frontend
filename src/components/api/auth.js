import axios from 'axios';
import { BASE_URL } from '../../routing/helpers';
import AuthProgress from '../../screens/Login/authProgress';

export const submitIdentity = (usernameOrEmail, onProgress) => {
  // Submit username or email and change auth progress according to whether
  // it exists.
  axios
    .post(`${BASE_URL}/auth/check`, { usernameOrEmail })
    .then((response) => {
      if (response.status === 200) {
        onProgress(AuthProgress.LOGIN);
      } else throw new Error(`Unexpected response: ${response.status}!`);
    })
    .catch((error) => {
      if (error.response?.status === 500) {
        onProgress(AuthProgress.SIGNUP);
      } else throw error;
    });
};

export const submitLogin = (
  usernameOrEmail,
  password,
  onSuccess,
  onFailure
) => {
  axios
    // Submit username and password
    .post(`${BASE_URL}/auth/login`, { usernameOrEmail, password })
    // If correct, redirect using onSuccess
    .then((response) => {
      if (response.status === 200) onSuccess();
      else throw new Error(`Unexpected response: ${response.status}!`);
    })
    // Report error
    .catch((error) => {
      if (error.response?.status === 422) onFailure();
      else throw error;
    });
};

export const submitSignup = (newUser, onSuccess, onFailure) => {
  axios
    // Submit new user data
    .post(`${BASE_URL}/auth/signup`, {
      username: newUser.username,
      password: newUser.password,
      contactInformation: {
        email: newUser.email,
      },
    })
    // If successfully signed up, redirect using onSuccess
    .then((response) => {
      if (response.status === 200) onSuccess();
      else throw new Error(`Unexpected response: ${response.status}!`);
    })
    // Report error
    .catch((error) => {
      if (error.response?.status === 422) onFailure();
      else throw error;
    });
};
