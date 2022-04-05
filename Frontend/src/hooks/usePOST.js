import { useState } from 'react';
import axios from 'axios';

const usePOST = () => {
  //Data, loading and error states
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchPost = (url, data) => {
    setIsError(null);
    setIsLoading(true);

    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else if (response.status === 406) {
          throw new Error(`${response.message}`);
        } else {
          throw new Error('Unknown Error, update page and try again!');
        }
      })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
        setIsError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.message);
      });
  };

  return { data, isLoading, isError, fetchPost };
};

export default usePOST;
