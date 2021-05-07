import axios from 'axios';
import {
  API_VERSION,
  BASE_URL_DEV,
  BASE_URL_PROD,
  DEBUG,
  LOCAL_STORAGE_TOKEN_KEY,
} from 'utils/environment';

const HOST = DEBUG ? BASE_URL_DEV : BASE_URL_PROD;
export const BASE_URL = `${HOST}/${API_VERSION}`;

export const successWith = (onSuccess, onFailure, ...successStatusCodes) => (
  response
) => {
  if (successStatusCodes.includes(response.status)) {
    onSuccess(response.data.body);
  } else {
    onFailure(response, false);
  }
};

export const failureWith = (onFailure, ...expectedStatusCodes) => (error) => {
  if (!axios.isCancel(error)) {
    const expected =
      error.response && expectedStatusCodes.includes(error.response.status);
    onFailure(error, expected);
  }
};

export const withAuth = (config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
