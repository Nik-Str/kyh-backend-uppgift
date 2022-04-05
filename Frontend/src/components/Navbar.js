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
          <i className="pi pi-fw pi-home mr-1"></i>
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
          <i className="pi pi-cloud-upload mr-1"></i>
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
          <i className="pi pi-cloud-download mr-1"></i>
          Download
        </Link>
      );
    },
  },
];

const start = <div className="ml-1 text-xl font-bold">Easy Sharing</div>;

const Navbar = () => {
  return (
    <header>
      <Menubar className="h-full flex justify-content-between shadow-4" model={links} start={start} />
    </header>
  );
};

export default Navbar;
