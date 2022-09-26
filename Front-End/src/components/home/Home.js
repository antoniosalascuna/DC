import React from 'react';

import ListarClientes from '../ListarClientes';
import ModalEditCliente from '../ModalEditCliente';
import Carrucel from './Carrucel/Carrucel';

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
             
                <Carrucel/>
                
            </div>



        );
    }
}

export default Clientes;