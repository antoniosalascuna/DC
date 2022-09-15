import React from 'react';
import colmena from '../assets/imgs/colmena.png';
import {
    Link
} from 'react-router-dom'

class HeadMenu extends React.Component{

    render(){
    
        return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand" href="#">
                    <img src={colmena} width="30" height="30" className="d-inline-block align-top" alt="" />
                    Colmenas del Sur
                    </a>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {/*<a className="nav-link" href="#">Home</a>*/}
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            {/*<a className="nav-link" href="#">Productos</a>*/}
                            <Link to='/productos' className="nav-link">Productos</Link>
                        </li>
                        <li className="nav-item">
                            {/*<a className="nav-link" href="#">Admin Facturas</a>*/}
                            <Link to='/adminFacturas' className="nav-link">Admin Facturas</Link>
                        </li>
                        <li className="nav-item">
                            {/*<a className="nav-link" href="#">Facturar</a>*/}
                            <Link to='/facturar' className="nav-link">Facturar</Link>
                        </li>
                        <li className="nav-item">
                            {/*<a className="nav-link" href="#">Clientes</a>*/}
                            <Link to='/clientes' className="nav-link">Clientes</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        );
    }
}

export default HeadMenu;