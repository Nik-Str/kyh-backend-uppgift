//React Router
import { Link } from 'react-router-dom';
//Prime React
import { Menubar } from 'primereact/menubar';

const Navbar = ({ loggedIn }) => {
  const links = [
    loggedIn
      ? {
          label: 'Upload',
          template: () => {
            return (
              <Link to="/upload" className="p-3 no-underline text-white">
                Upload
              </Link>
            );
          },
        }
      : {
          label: 'Log in',
          template: () => {
            return (
              <Link to="/login" className="p-3 no-underline text-white">
                Log in
              </Link>
            );
          },
        },
    loggedIn
      ? {
          label: 'Download',
          template: () => {
            return (
              <Link to="/download" className="p-3 no-underline text-white">
                Download
              </Link>
            );
          },
        }
      : {
          label: 'Sign up',
          template: () => {
            return (
              <Link to="/signup" className="p-3 no-underline text-white">
                Sign up
              </Link>
            );
          },
        },
    loggedIn && {
      label: 'Profile',
      template: () => {
        return (
          <Link to="/profile" className="p-3 no-underline text-white">
            Profile
          </Link>
        );
      },
    },
    loggedIn && {
      label: 'log out',
      template: () => {
        return (
          <a href={`${process.env.REACT_APP_SEVER_URL}/logout`} className="p-3 no-underline text-white">
            Log out
          </a>
        );
      },
    },
  ];

  const start = (
    <div className="flex align-items-center">
      <Link to="/" className="p-3 no-underline text-white flex align-items-center">
        <i className="pi pi-box ml-2" style={{ fontSize: '2em', color: 'var(--primary-color)' }}></i>
        <div className="ml-2 text-xl font-bold">Easy Sharing</div>
      </Link>
    </div>
  );

  return (
    <header>
      <Menubar className="h-full flex justify-content-between shadow-4" model={links} start={start} />
    </header>
  );
};

export default Navbar;
