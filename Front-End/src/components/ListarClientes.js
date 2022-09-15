import React from 'react';
import '../assets/css/Clientes.css';
import axios from 'axios';

class ListarClientes extends React.Component {

    constructor(props) { 
        super(props);

        this.state = {
            cliente: []
        }
        this.openModal = this.openModal.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.inputRef = React.createRef();
    };
    
    openModal(...cliente) {
        /*console.log(cliente[0]+'  '+cliente[1]+'  '+cliente[2]+'  '+cliente[3]+'  '+
                    cliente[4]+'  '+cliente[5]+'  '+cliente[6]);*/
        this.setState({ cliente });
        //this.props.cambio(parametros);
       
    }
    
    deleteRow(id) {

        axios({
            method: 'post',     //put
            url: `http://localhost:9000/clientes/deleteC`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                CLI_ID_CLIENTE: id,
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.props.listado();
        });
       
    }
    
    handleSubmit(event) {
        event.preventDefault();
        /*this.setState({
            submit: this.state.input
        });*/
        //console.log(event.target['numeroAcuerdo'].value);

        axios({
            method: 'post',     //put
            url: `http://localhost:9000/clientes/updateCI`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                CLI_ID_CLIENTE: event.target['id'].value,
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
            this.props.listado();
        });

    }

    render() {
        return (
            <div className="container">

                <table className="table table-striped table-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Cedula</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            {/*onclick="formVerAcuerdo(\''+datos.numeroAcuerdo+'\',\''+datos.fecha+'\',\''+datos.articulo+'\',\''+datos.numeroActa+'\',\''+datos.descripcion+'\',\''+datos.motivo+'\');"*/
                               
                               this.props.clientes.map((pro, i) => {
                                    return (
                                        <tr key={'tr'+i+1} scope="row">
                                            <td key={'ced'+i+1}>{pro.CLI_CEDULA}</td>
                                            <td key={'nom'+i+1}>{pro.CLI_NOMBRE}</td>
                                            <td key={'apelli'+i+1}>{pro.CLI_APELLIDOS}</td>
                                            <td key={'tel'+i+1}>{pro.CLI_TELEFONO}</td>
                                            <td key={'corr'+i+1}>{pro.CLI_CORREO}</td>
                                            <td key={'dir'+i+1}>{pro.CLI_DIRECCION}</td>
                                            <td key={'edit'+i+1}> <button type="submit" data-toggle="modal" data-target="#ModalEditCliente" className="btn btn-editar" 
                                            onClick={()=> this.openModal(
                                                        pro.CLI_ID_CLIENTE,pro.CLI_CEDULA, pro.CLI_NOMBRE, pro.CLI_APELLIDOS, pro.CLI_TELEFONO, pro.CLI_CORREO,pro.CLI_DIRECCION)}>
                                                
                                            <i className="app-menu__icon fa fa-pencil-square-o"></i></button></td>
                                             <td key={'delete'+i+1}> 
                                                <button type="submit"  className="btn btn-delete"  onClick={()=> this.deleteRow(pro.CLI_ID_CLIENTE)}>
                                                
                                                    <i className="app-menu__icon fa fa-pencil-square-o"></i>
                                                </button>
                                            </td>
                                        </tr>
                                      
                                    );
                                })
                            }
                       
                    </tbody>
                </table>
                
                <div className="modal fade" id="ModalEditCliente" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
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
                                                    defaultValue={this.state.cliente[1]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="nombre">Nombre</label>
                                                <input type="text" className="form-control" id="nombre" placeholder="Nombre"
                                                    defaultValue={this.state.cliente[2]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="descripcion">Apellidos</label>
                                                <input type="text" className="form-control" id="apellidos" placeholder="Apellidos"  defaultValue={this.state.cliente[3]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="precio">Telefono</label>
                                                <input type="text" className="form-control" id="telefono" placeholder="Telefono" defaultValue={this.state.cliente[4]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="stock">Correo</label>
                                                <input type="text" className="form-control" id="correo" placeholder="Correo" 
                                                defaultValue={this.state.cliente[5]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="stock">Direccion</label>
                                                <input type="text" className="form-control" id="direccion" placeholder="Direccion" 
                                                defaultValue={this.state.cliente[6]}></input>
                                                
                                            </div>
                                            
                                            <input type='hidden' id='estado' name='estado' value='A' />
                                            <input type='hidden' id='id' name='id' defaultValue={this.state.cliente[0]} />

                                            <div className="col-auto">
                                                <button type="submit" className="btn btn-editar btn-dark" id="editarAcuedo" >Insertar</button>
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

        )
    }

}
export default ListarClientes;