import { useState } from 'react';
import axios from 'axios';
import STD_MESSAGES from 'messages/standard';
import { useSnackbar } from 'notistack';

const useAxios = (
  axiosBlock,
  operationName = '',
  onSuccess = () => {},
  onExpectedError = () => {}
) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const fetch = (...args) => {
    // We use this variable in order to pass the value to the axiosBlock and
    // also to the state as the state propagation is asynchronous.
    const localSource = axios.CancelToken.source();
    setSource(localSource);
    setIsLoading(true);
    axiosBlock(
      (body) => {
        setIsLoading(false);
        setData(body);
        setError(null);
        onSuccess(body);
      },
      (err, expected) => {
        setIsLoading(false);
        if (expected) {
          onExpectedError(err);
        } else {
          enqueueSnackbar(
            `${STD_MESSAGES.UNEXPECTED(operationName)}\nCause: ${err}`,
            {
              variant: 'error',
            }
          );
        }
        setError(err);
        setData(null);
      },
      localSource.token,
      ...args
    );
  };

  const cancelPrevious = () => {
    if (source != null) source.cancel();
    setIsLoading(false);
  };

  return [fetch, cancelPrevious, data, error, isLoading];
};

export default useAxios;
