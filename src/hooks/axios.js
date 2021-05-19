import { useEffect, useState } from 'react';
import axios from 'axios';
import StdMessages from 'messages/standard';
import { useSnackbar } from 'notistack';
import { uploadBookImage } from 'api/books';
import {
  makeUnique,
  toBase64,
  cleanBase64,
  makeFilenameUnique,
} from 'utils/files';

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
  maxConcurrentUploads,
  queue,
  onTaken,
  onCompletion,
  onExpectedError
) => {
  const { enqueueSnackbar } = useSnackbar();
  const [tasksWorking, setTasksWorking] = useState([]);
  const addTaskWorking = (task) => setTasksWorking([...tasksWorking, task]);
  const removeTaskWorking = (taskToRemove) =>
    setTasksWorking(
      tasksWorking.filter((task) => task.key !== taskToRemove.key)
    );

  const dispatch = (key, axiosBlock, data) => {
    const taskName = `${operationName} [${key}]`;
    addTaskWorking({ key, data });
    axiosBlock(
      (body) => {
        removeTaskWorking(key);
        onCompletion(key, body);
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
      cleanBase64(data)
    );
  };

  useEffect(() => {
    const tasksReady = maxConcurrentUploads - tasksWorking.length;
    console.log(`tasksReady = ${tasksReady}`);
    const nextToUpload = queue[0];
    // If we can start another task without exceeding the limit
    // and there is another task pending
    if (tasksReady > 0 && nextToUpload) {
      onTaken(nextToUpload.key);
      const newKey = makeFilenameUnique(
        (key) => !!tasksWorking.find((task) => task.key === key),
        nextToUpload.key
      );
      console.log(`dispatcher chose key: ${newKey}`);
      dispatch(newKey, uploadBookImage, nextToUpload.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxConcurrentUploads, tasksWorking, queue]);

  return [tasksWorking];
};
