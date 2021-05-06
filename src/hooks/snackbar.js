import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

const useStatefulSnackbar = (value, message, variant) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (value && message) enqueueSnackbar(message.toString(), { variant });
  }, [value]);
};

export default useStatefulSnackbar;
