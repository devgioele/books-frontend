import { useEffect, useState } from 'react';
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
  const [failure, setFailure] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (failure) {
      if (failure.expected) onExpectedError(failure.error);
      else
        enqueueSnackbar(
          `${STD_MESSAGES.UNEXPECTED(operationName)}\nCause: ${failure.error}`,
          {
            variant: 'error',
          }
        );
    }
  }, [failure]);

  const fetch = (...args) => {
    console.log('-- fetching');
    // We use this variable in order to pass the value to the axiosBlock and
    // also to the state as the state propagation is asynchronous.
    const localSource = axios.CancelToken.source();
    setSource(localSource);
    setIsLoading(true);
    axiosBlock(
      (body) => {
        console.log(`-- success`);
        setIsLoading(false);
        setData(body);
        onSuccess(body);
      },
      (err, expected) => {
        console.log(`-- failure`);
        setIsLoading(false);
        setFailure({
          error: err,
          expected,
        });
      },
      localSource.token,
      ...args
    );
  };

  const cancelPrevious = () => {
    console.log('-- cancelling');
    if (source != null) source.cancel();
    setIsLoading(false);
  };

  return [fetch, cancelPrevious, data, failure?.error, isLoading];
};

export default useAxios;
