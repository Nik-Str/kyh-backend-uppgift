//React
import { useState, useEffect } from 'react';
//Prime Reract
import { FileUpload } from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
//Hooks
import usePOST from '../hooks/usePOST';

const Upload = () => {
  const { data, isLoading, isError, fetchPost } = usePOST();
  const [description, setDescription] = useState('');

  const handleUpload = (event) => {
    const formData = new FormData();
    event.files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    formData.append('description', description);
    fetchPost(`${process.env.REACT_APP_SEVER_URL}/upload`, formData);
  };

  useEffect(() => {
    if (data) setDescription('');
  }, [data]);

  return (
    <div className="container">
      <div className="w-full md:w-30rem shadow-4 border-round surface-card p-3">
        <h1 className="text-center">Upload Files</h1>
        <div className="flex justify-content-center pb-4">
          <div>
            {!isLoading && (
              <>
                <div className="flex">
                  <InputText
                    placeholder="File description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mb-2 w-16rem"
                  />
                  <FileUpload
                    mode="basic"
                    chooseLabel="Add files"
                    auto={true}
                    uploadHandler={(e) => handleUpload(e)}
                    customUpload={true}
                    multiple={true}
                    disabled={description === '' ? true : false}
                  />
                </div>
              </>
            )}
            {isLoading && (
              <Button className="p-button-outlined" type="submit">
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

export default Upload;
