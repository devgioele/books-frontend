import { useEffect, useState } from 'react';
import axios from 'axios';
import StdMessages from 'messages/standard';
import { useSnackbar } from 'notistack';
import { sellBook } from '../api/books';

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
        if (expected) onExpectedError(err);
        else if (isNetworkError(err)) {
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

// Tasks delivered to this hook calling 'dispatch' must have UNIQUE keys!
export const useAxiosDispatcher = (
  operationName,
  onSuccess,
  onExpectedError
) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tasksWorking, setTasksWorking] = useState([]);
  const addTaskWorking = (task) => setTasksWorking([...tasksWorking, task]);
  const removeTaskWorking = (taskToRemove) =>
    setTasksWorking(tasksWorking.filter((task) => task !== taskToRemove));

  const dispatch = (key, axiosBlock, ...args) => {
    const taskName = `${operationName} [${key}]`;
    addTaskWorking(key);
    axiosBlock(
      (body) => {
        removeTaskWorking(key);
        onSuccess(key, body);
      },
      (err, expected) => {
        removeTaskWorking(key);
        if (expected) onExpectedError(key, err);
        else if (isNetworkError(err)) {
          enqueueSnackbar(`${StdMessages.NETWORK_ERROR(taskName)}`, {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(
            `${StdMessages.UNEXPECTED(taskName)}\nCause: ${err}`,
            {
              variant: 'error',
            }
          );
        }
      },
      null,
      ...args
    );
  };

  return [dispatch, tasksWorking];
};
