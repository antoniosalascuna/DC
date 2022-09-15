import React from 'react';
import '../assets/css/Clientes.css';
import axios from 'axios';

import ListarClientes from './ListarClientes';
import ModalEditCliente from './ModalEditCliente';

class Clientes extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            name:'Diego',
            clientes:[],
            cliente:[]
        }; 
    }

    render() {

        return (
            <div id='container'>
             Hi
                
                
            </div>



        );
    }
}

export default Clientes;