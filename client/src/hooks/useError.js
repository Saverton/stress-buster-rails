import { useState, useCallback } from 'react';

function useError() {
  const [error, setError] = useState({
    show: false,
    message: ''
  });

  const showError = useCallback(err => {
    setError({
      show: true,
      message: err.errors.join(', ')
    });
  }, []);

  const hideError = () => {
    setError({
      show: false,
      message: ''
    });
  }

  return {
    error,
    showError,
    hideError
  }
}

export default useError;
