import logo from './assets/imgs/logo.svg';
import './assets/css/App.css';



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import HeaderMenu from './components/HeaderMenu';
import Productos from './components/Productos.js';
import Clientes from './components/Clientes.js';
import Facturacion from './components/Facturacion.js';
import Factura from './components/Factura.js';
import Home from './components/Home.js';
/*import Productos from './components/Productos.js';*/

function App() {
  return (
    <div className="App">
          <Router>
            <HeaderMenu />
            <Switch>
                <Route path="/productos">
                    <Productos />
                </Route>
                <Route path="/adminFacturas">
                  <Factura/>
                </Route>
                <Route path="/facturar">
                    <Facturacion />
                </Route>
                <Route path="/clientes">
                    <Clientes />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
          </Router>
          
          
          
    </div>
  );
}

export default App;
