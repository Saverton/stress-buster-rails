import { useState, useCallback } from 'react';

function useError() {
  const [error, setError] = useState({
    show: false,
    message: ''
  });

  const showError = useCallback(msg => {
    setError({
      show: true,
      message: msg
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
