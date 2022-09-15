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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.listaClientes = this.listaClientes.bind(this);

        this.search = this.search.bind(this);
        this.cambio = this.cambio.bind(this);

        
    }
    listaClientes() {
        axios.get(`http://localhost:9000/clientes/lista`).then(res => {
            const data = res.data;
            const clientes = data.listado;
            this.setState({ clientes });
        })
    }
    
    cambio(cliente){
        this.setState({cliente} );
        console.log('Cambio: ' +cliente[2]);
    }
    
    /*insertarCliente() {
        axios.get(`http://localhost:9000/clientes/insertarC`).then(res => {
            const data = res.data;
            const clientes = data.listado;
            this.setState({ clientes });
        })
    }*/
    
    componentDidMount() {
        this.listaClientes();
    }
    
    handleSubmit(event) {
        event.preventDefault();
        /*this.setState({
            submit: this.state.input
        });*/
        //console.log(event.target['numeroAcuerdo'].value);
        
        axios({
            method: 'post',     //put
            url: `http://localhost:9000/clientes/insertarC`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                CLI_CEDULA: event.target['cedula'].value,
                CLI_NOMBRE: event.target['nombre'].value,
                CLI_APELLIDOS: event.target['apellidos'].value,
                CLI_TELEFONO: event.target['telefono'].value,
                CLI_CORREO: event.target['correo'].value,
                CLI_DIRECCION: event.target['direccion'].value,
                CLI_ESTADO: event.target['estado'].value
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.listaClientes();
        });

    }
     search(event){
        event.preventDefault();
        
        axios({
            method: 'post',     //put
            url: `http://localhost:9000/clientes/filtradoC`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                texto: event.target['inputBuscar'].value,

            }
        }).then(res => {
            const data = res.data;
            const clientes = data.listado;
            this.setState({ clientes });
        });
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        //console.log('Should I update? '+ nextProps.value);
        return true;
        /*if(nextProps.value % 2 == 0){
            return true;
        }else{
            return false;
        }*/
    }

    render() {

        return (
            <div id='container'>
                
                
                
                <div id='contenedorPrimario'>

                    <label htmlFor='inputBuscar'>Buscar Cliente:</label>
                    <form onSubmit={this.search}>
                        <div className="input-group mb-3">
                        
                            <input id='inputBuscar' type="text" className="form-control" placeholder="Cédula Cliente" aria-label="Cedula Cliente" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
                            </div>
                        
                        </div>
                    </form>
                    <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
                    Insertar Cliente
                    </button>
                    
                    
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Insertar Producto</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="insertCliente">
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="form-row">
                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="numeroAcuerdo">Cedula</label>
                                                <input type="text" className="form-control" id="cedula" placeholder="Cedula"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="nombre">Nombre</label>
                                                <input type="text" className="form-control" id="nombre" placeholder="Nombre"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="descripcion">Apellidos</label>
                                                <input type="text" className="form-control" id="apellidos" placeholder="Apellidos"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="precio">Telefono</label>
                                                <input type="text" className="form-control" id="telefono" placeholder="Telefono"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="stock">Correo</label>
                                                <input type="text" className="form-control" id="correo" placeholder="Correo"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="stock">Direccion</label>
                                                <input type="text" className="form-control" id="direccion" placeholder="Direccion"></input>
                                                
                                            </div>
                                            
                                            <input type='hidden' id='estado' name='estado' value='A' />
                                            



                                            <div className="col-auto">
                                                <button type="submit" className="btn btn-editar btn-dark" id="editarAcuedo">Insertar</button>
                                            </div>


                                        </div>

                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div id='contenedorSecundario'>
                    <ListarClientes listado={this.listaClientes} cambio={this.cambio} clientes={this.state.clientes} />
                </div>
                
                
            </div>



        );
    }
}

export default Clientes;