import { useState } from 'react';
import axios from 'axios';

const usePOST = () => {
  //Data, loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);

  const fetchGET = (url, name) => {
    setIsError(null);
    setIsLoading(true);

    axios
      .get(url, {
        responseType: 'blob',
        validateStatus: () => true,
      })
      .then(async (response) => {
        if (response.status === 200) {
          setIsLoading(false);

          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${name}.zip`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);

          setTimeout(() => {
            setData(null);
          }, 4000);
          return setData('Download complete!');
        } else if (response.status === 404) {
          const fr = new FileReader();

          const error = () => {
            return new Promise((resolve) => {
              fr.onload = (e) => {
                const error = JSON.parse(e.target.result);
                resolve(error.message);
              };

              fr.readAsText(response.data);
            });
          };

          throw new Error(`${await error()}`);
        } else {
          throw new Error('Unknown Error, update page and try again!');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(err.message);
      });
  };

  return { data, isLoading, isError, fetchGET };
};

export default usePOST;
