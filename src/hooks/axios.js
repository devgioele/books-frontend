import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const useAxios = (axiosBlock) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState(null);

  const fetch = (...args) => {
    // We use this variable in order to pass the value to the axiosBlock and
    // also to the state as the state propagation is asynchronous.
    const localSource = axios.CancelToken.source();
    setSource(localSource);
    setIsLoading(true);
    axiosBlock(
      (body) => {
        setData(body);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
      localSource.token,
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
