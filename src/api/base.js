import axios from 'axios';
import {
  API_VERSION,
  BASE_URL_DEV,
  BASE_URL_PROD,
  DEBUG,
} from '../utils/environment';

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
  // TODO: implement proper failure handling.
  if (error.response) {
    if (failureStatusCodes.includes(error.response.status)) {
      onFailure(error.response.data.detail);
    } else {
      throw new Error(`Unexpected response: ${error.response.status}!`);
    }
  } else if (!axios.isCancel(error)) {
    onFailure(error);
  }
};
