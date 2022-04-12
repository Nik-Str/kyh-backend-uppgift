import { useState } from 'react';
import axios from 'axios';

const usePOST = () => {
  //Data, loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchPost = (url, data) => {
    setIsError(null);
    setIsLoading(true);

    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
          setIsLoading(false);
          return (window.location.href = `${process.env.REACT_APP_CLIENT_URL}`);
        } else {
          throw new Error('Unknown Error, update page and try again!');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.response.data.message);
      });
  };

  return { isLoading, isError, fetchPost };
};

export default usePOST;
