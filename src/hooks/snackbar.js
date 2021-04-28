import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useStatefulSnackbar = (value, message, variant) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (value && message) {
      enqueueSnackbar(message.toString(), { variant });
    }
  }, [value, enqueueSnackbar, message, variant]);
}
