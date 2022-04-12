//React
import { useState, useEffect } from 'react';
//Axios
import axios from 'axios';
//Prime React
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
//Component
import ChartComp from '../components/Chart';

const Profile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_SEVER_URL}/status`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => getData(), []);

  const handleRemove = async (fileName) => {
    setIsLoading(true);
    setIsError(null);
    axios
      .post(
        `${process.env.REACT_APP_SEVER_URL}/remove`,
        { fileName: fileName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          getData();
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsError(err.response.data.message);
      });
  };

  const round = (rowData) => {
    const a = Math.round(rowData.fileSize * 100) / 100;
    return a;
  };

  const removeBtn = (rowData) => {
    return (
      <>
        {!isLoading && (
          <Button
            type="button"
            className="p-button-outlined p-button-secondary border-none"
            onClick={() => handleRemove(rowData.fileName)}
          >
            <i className="pi pi-times" style={{ fontSize: '1.3em' }}></i>
          </Button>
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
      </>
    );
  };

  return (
    <div className="container">
      <div className="shadow-4 border-round surface-card tableContainer p-5">
        <h1 className="text-center">Profile</h1>
        {data && (
          <DataTable value={data.uploads} responsiveLayout="scroll">
            <Column field="fileName" header="Name"></Column>
            <Column field="fileSize" header="Size mb" body={round}></Column>
            <Column header="Remove" body={removeBtn}></Column>
          </DataTable>
        )}
        {data && <ChartComp memory={data.memory} />}
        {isError && <p className="text-pink-500 font-bold text-center">{isError}</p>}
      </div>
    </div>
  );
};

export default Profile;
