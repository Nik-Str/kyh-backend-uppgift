//React Router
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="w-full h-full flex justify-content-center align-items-center">
        <div className="text-center">
          <h1>404 Not Found. </h1>
          <Link to="/" className="p-3 no-underline text-white">
            <i className="pi pi-fw pi-home mr-1"></i>Return to homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
