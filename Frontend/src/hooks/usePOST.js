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
        validateStatus: () => true,
      })
      .then((response) => {
        if (response.status === 201) {
          setIsLoading(false);
          return setData(response.data.data);
        } else if (response.status === 406) {
          throw new Error(`${response.data.message}`);
        } else {
          throw new Error('Unknown Error, update page and try again!');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.message);
      });
  };

  return { data, isLoading, isError, fetchPost };
};

export default usePOST;
