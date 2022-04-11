//Prime Reract
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
//React
import { useState, useEffect } from 'react';
//Hooks
import useGET from '../hooks/useGET';

const Download = () => {
  const { data, isLoading, isError, fetchGET } = useGET();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('');
  }, [data]);

  const handleDownload = (event) => {
    event.preventDefault();
    fetchGET(`http://localhost:8080/download/${value}`, value);
  };

  return (
    <div className="container">
      <div className="w-full md:w-30rem shadow-4 border-round surface-card">
        <h1 className="text-center">Download Files</h1>
        <div className="flex justify-content-center pb-4">
          <div>
            {!isLoading && !isError && (
              <form onSubmit={(e) => handleDownload(e)}>
                <InputText placeholder="Enter download link" value={value} onChange={(e) => setValue(e.target.value)} />
                <Button type="submit" disabled={value === '' ? true : false}>
                  Download
                </Button>
              </form>
            )}
            {isLoading && (
              <Button className="p-button-outlined" type="submit" disabled>
                <ProgressSpinner
                  style={{ width: '1rem', height: '1rem', padding: '0.5rem 1rem' }}
                  strokeWidth="12"
                  animationDuration="2s"
                />
              </Button>
            )}
            {isError && <p className="text-pink-500 font-bold text-center">{isError}</p>}
            {data && <p className="text-green-300 font-bold text-center">{data}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
