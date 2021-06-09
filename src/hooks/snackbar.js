import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

const useStatefulSnackbar = (value, message, variant) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (value && message) enqueueSnackbar(message.toString(), { variant });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
};

export default useStatefulSnackbar;
