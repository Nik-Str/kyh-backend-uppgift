//Prime Reract
import { FileUpload } from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
//Hooks
import usePOST from '../hooks/usePOST';

const Upload = () => {
  const { data, isLoading, isError, fetchPost } = usePOST();

  const handleUpload = (event) => {
    const videoFile = event.files[0];
    const formData = new FormData();
    formData.append('file', videoFile);
    fetchPost('http://localhost:8080/upload', formData);
  };

  return (
    <div className="container">
      <div className="w-full md:w-30rem shadow-4 border-round surface-card">
        <h1 className="text-center">Upload Files</h1>
        <div className="flex justify-content-center pb-4">
          <div>
            {!data && !isLoading && !isError && (
              <FileUpload
                mode="basic"
                chooseLabel="Add a file"
                auto={true}
                uploadHandler={(e) => handleUpload(e)}
                customUpload={true}
              />
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
            {isError && <p className="text-pink-500 font-bold">{isError}</p>}
            {data && <p className="text-green-300 font-bold">{data}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
