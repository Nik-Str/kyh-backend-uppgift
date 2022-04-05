//React Router
import { Outlet } from 'react-router-dom';
//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//PrimieReact
import 'primereact/resources/themes/vela-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import '/node_modules/primeflex/primeflex.css'; //Primeflex
import PrimeReact from 'primereact/api'; //Ripple

function App() {
  //Enables Ripple
  PrimeReact.ripple = true;

  return (
    <div className="App">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
