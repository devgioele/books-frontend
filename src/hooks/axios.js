import { useEffect, useState } from 'react';
import axios from 'axios';
import StdMessages from 'messages/standard';
import { useSnackbar } from 'notistack';

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
  axiosBlock,
  operationName,
  queue,
  removeFromQueue,
  onCompletion,
  onExpectedError
) => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentTasks, setCurrentTasks] = useState([]);

  useEffect(() => {
    console.log(`queue length = ${queue.length}`);
    // If we can start another task without exceeding the limit
    // and there is another task pending
    if (queue.length > 0) {
      const nextToUpload = queue[0];
      console.log('taken a new one');
      removeFromQueue(nextToUpload);
      setCurrentTasks([nextToUpload]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  useEffect(() => {
    if (currentTasks.length > 0) {
      const currentTask = currentTasks[0];
      axiosBlock(
        (body) => {
          console.log(`uploaded file: ${currentTask.name}`);
          setCurrentTasks([]);
          onCompletion(currentTask, body);
        },
        (err, expected) => {
          console.log(`upload failed for file: ${currentTask.name}`);
          setCurrentTasks([]);
          if (expected) onExpectedError(currentTask.name, err);
          else if (isNetworkError(err)) {
            enqueueSnackbar(`${StdMessages.NETWORK_ERROR(currentTask.name)}`, {
              variant: 'error',
            });
          } else {
            enqueueSnackbar(
              `${StdMessages.UNEXPECTED(currentTask.name)}\nCause: ${err}`,
              {
                variant: 'error',
              }
            );
          }
        },
        null,
        currentTasks[0]
      );
    }
  }, [currentTasks]);

  return [currentTasks];
};
