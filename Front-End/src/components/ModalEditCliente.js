import React from 'react';
import '../assets/css/Clientes.css';
import axios from 'axios';


class ModalEditCliente extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            name:'Diego',
            cliente:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    handleSubmit(event) {
        event.preventDefault();

        axios({
            method: 'post',     //put
            url: `http://localhost:9000/clientes/insertarC`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                CLI_ID_CLIENTE:event.target['cedula'].value,
                
                
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
    


    render() {

        return (
                
                <div className="modal fade" id="ModalEditCliente" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modificar Cliente</h5>
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
                                                <input type="text" className="form-control" id="cedula" placeholder="Cedula"
                                                    value={this.props.cliente[1]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="nombre">Nombre</label>
                                                <input type="text" className="form-control" id="nombre" placeholder="Nombre"
                                                    value={this.props.cliente[1]}></input>
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
                                            <input type='hidden' id='id' name='id' value='A' />

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
        );
    }
}

export default ModalEditCliente;