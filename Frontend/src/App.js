//React Router
import { Outlet } from 'react-router-dom';
//React
import { useEffect, useState } from 'react';
//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//PrimieReact
import 'primereact/resources/themes/vela-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import '/node_modules/primeflex/primeflex.css'; //Primeflex
import PrimeReact from 'primereact/api'; //Ripple
//Axios
import axios from 'axios';

//Context

function App() {
  //Enables Ripple
  PrimeReact.ripple = true;

  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SEVER_URL}/isLoggedIn`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(response.data.data);
      });
  }, []);

  return (
    <div className="App">
      {loggedIn !== null && <Navbar loggedIn={loggedIn} />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
