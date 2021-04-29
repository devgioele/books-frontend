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

export const successWith = (onSuccess, ...successStatusCodes) => (response) => {
  if (successStatusCodes.includes(response.status)) {
    onSuccess(response.data.body);
  } else {
    throw new Error(`Unexpected response: ${response.status}!`);
  }
};

export const failureWith = (onFailure, ...failureStatusCodes) => (error) => {
  // TODO: handle 401 unauthorized.
  if (error.response) {
    if (failureStatusCodes.includes(error.response.status)) {
      onFailure(error);
    } else {
      throw new Error(`Unexpected response: ${error.response.status}!`);
    }
  } else if (!axios.isCancel(error)) {
    onFailure(error);
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
