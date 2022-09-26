import './assets/css/App.css';



import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

import Navbar from './components/navbar/Navbar';
import Productos from './components/Productos.js';
import Clientes from './components/Clientes.js';
import Facturacion from './components/Facturacion.js';
import Factura from './components/Factura.js';
import Home from './components/home/Home.js';
/*import Productos from './components/Productos.js';*/

function App() {
  return (
    <div className="App">
          <Router>
            <Navbar />
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
