import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const useAxios = (axiosBlock) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let source = null;

  const fetch = (...args) => {
    source = axios.CancelToken.source();
    setIsLoading(true);
    axiosBlock(
      (body) => {
        source = null;
        setData(body);
        setIsLoading(false);
      },
      (err) => {
        source = null;
        setError(err);
        setIsLoading(false);
      },
      source.token,
      ...args,
    );
  };

  const cancelPrevious = () => {
    if (source != null) {
      source.cancel();
    }
  };

  return [
    fetch,
    cancelPrevious,
    data,
    error,
    isLoading
  ]
}
