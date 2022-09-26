import React from 'react';
import colmena from '../../assets/imgs/DCLogo.png';
import {
    Link
} from 'react-router-dom'
import './navbar.css'
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
const Navbar = () => {

    const [toggleMenu, setToggleMenu] = React.useState(false);
    return (
        <div>
            <nav className="navbar navbar-expand-lg nav_style ">

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand app_navbar_logo" href="#">
                        <img src={colmena} alt="app logo" />
                    </a>
                    <ul className="navbar-nav app_navbar_links">
                        <li>
                            <Link to='/' className="nav-link ">Inicio</Link>
                        </li>
                        <li>
                            <Link to='/' className="nav-link ">Sobre Nosotros</Link>
                        </li>
                        <li>
                            <Link to='/' className="nav-link ">Productos</Link>
                        </li>
                        <li>
                            <Link to='/' className="nav-link  ">Contacto</Link>
                        </li>

                        {/*  <li className="nav-item">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                           
                            <Link to='/productos' className="nav-link">Productos</Link>
                        </li>
                        <li className="nav-item">
                           
                            <Link to='/adminFacturas' className="nav-link">Admin Facturas</Link>
                        </li>
                        <li className="nav-item">
                           
                            <Link to='/facturar' className="nav-link">Facturar</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/clientes' className="nav-link">Clientes</Link>
                        </li> */}
                    </ul>
                </div>
                <div className="app__navbar-smallscreen">
                    <div className='GiHamburgerMenuIcon'>
                    <GiHamburgerMenu color="#000000" fontSize={27} onClick={() => setToggleMenu(true)} />
                    </div>
                   
                    {toggleMenu && (
                        <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
                            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
                            <ul className="app__navbar-smallscreen_links">
                                <li>
                                    
                                    <Link to='/' className="nav-link " onClick={() => setToggleMenu(false)}>Inicio</Link>
                                </li>
                                <li>
                                   
                                    <Link to='/' className="nav-link " onClick={() => setToggleMenu(false)}>Sobre Nosotros</Link>
                                </li>
                                <li>
                                    
                                    <Link to='/' className="nav-link " onClick={() => setToggleMenu(false)}>Productos</Link>
                                </li>
                                <li>
                                   
                                    <Link to='/' className="nav-link " onClick={() => setToggleMenu(false)}>Contacto</Link>
                                </li>
                            
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar