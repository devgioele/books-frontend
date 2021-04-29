import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

const useStatefulSnackbar = (value, message, variant, ...toIgnore) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (value && message && !toIgnore.includes(value))
      enqueueSnackbar(message.toString(), { variant });
  }, [enqueueSnackbar, value, message, variant]);
};

export default useStatefulSnackbar;
