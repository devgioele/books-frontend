import { useRef, useState } from 'react';
import axios from 'axios';
import StdMessages from 'messages/standard';
import { useSnackbar } from 'notistack';
import { axiosState } from 'utils/constants';

function isNetworkError(error) {
  return !!error.isAxiosError && !error.response;
}

export const useAxios = (
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
        setData(null);
        setError(err);

        if (expected) {
          onExpectedError(err);
        } else if (isNetworkError(err)) {
          enqueueSnackbar(`${StdMessages.NETWORK_ERROR(operationName)}`, {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(
            `${StdMessages.UNEXPECTED(operationName)}\nCause: ${err}`,
            {
              variant: 'error',
            }
          );
        }
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

export const useStatelessAxios = (axiosBlock, operationName = '') => {
  const { enqueueSnackbar } = useSnackbar();

  const sources = useRef([]);
  const removeSource = (sourceToRemove) => {
    sources.current = sources.current.filter(
      (source) => source !== sourceToRemove
    );
  };
  const addSource = (sourceToAdd) => {
    sources.current = [...sources.current, sourceToAdd];
  };

  const fetch = (onStateChange = (state, data) => {}, ...args) => {
    // We use this variable in order to pass the value to the axiosBlock and
    // also to the state as the state propagation is asynchronous.
    const localSource = axios.CancelToken.source();
    addSource(localSource);

    onStateChange(axiosState.progress, null);
    axiosBlock(
      (body) => {
        removeSource(localSource);
        onStateChange(axiosState.success, body);
      },
      (err, expected) => {
        removeSource(localSource);
        if (expected) {
          onStateChange(axiosState.error, err);
        } else if (isNetworkError(err)) {
          enqueueSnackbar(`${StdMessages.NETWORK_ERROR(operationName)}`, {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(
            `${StdMessages.UNEXPECTED(operationName)}\nCause: ${err}`,
            {
              variant: 'error',
            }
          );
        }
      },
      localSource.token,
      ...args
    );
  };

  const cancelAll = () => {
    const sourcesCopy = [...sources.current];
    // Remove all
    sources.current = [];
    // Cancel each
    sourcesCopy.forEach((source) => source.cancel());
  };

  return [fetch, cancelAll];
};
