//React Router
import { Link } from 'react-router-dom';
//Prime React
import { Menubar } from 'primereact/menubar';

const links = [
  {
    label: 'Home',
    template: () => {
      return (
        <Link to="/" className="p-3 no-underline text-white">
          <i className="pi pi-fw pi-home mr-1 my-2"></i>
          Home
        </Link>
      );
    },
  },
  {
    label: 'Upload',
    template: () => {
      return (
        <Link to="/upload" className="p-3 no-underline text-white">
          <i className="pi pi-cloud-upload mr-1 my-2"></i>
          Upload
        </Link>
      );
    },
  },
  {
    label: 'Download',
    template: () => {
      return (
        <Link to="/download" className="p-3 no-underline text-white">
          <i className="pi pi-cloud-download mr-1 my-2"></i>
          Download
        </Link>
      );
    },
  },
];

const start = (
  <div className="flex align-items-center">
    <i className="pi pi-box ml-2" style={{ fontSize: '2em', color: 'var(--primary-color)' }}></i>
    <div className="ml-2 text-xl font-bold">Easy Sharing</div>
  </div>
);

const Navbar = () => {
  return (
    <header>
      <Menubar className="h-full flex justify-content-between shadow-4" model={links} start={start} />
    </header>
  );
};

export default Navbar;
