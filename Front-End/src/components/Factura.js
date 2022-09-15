import React from 'react';
import '../assets/css/Factura.css';
import axios from 'axios';
import { ToastsContainer, ToastsStore } from 'react-toasts';

class Factura extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            facturas: [],
            factura:[]

        }

        this.listarfactura = this.listarfactura.bind(this);
        this.search = this.search.bind(this);
        this.delete = this.delete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    };

    listarfactura = () => {

        axios.get(`http://localhost:9000/facturas/lista`).then(res => {
            const data = res.data;
            const facturas = data.listado;
            this.setState({ facturas });
        })
    }


    delete = (e, ident) => {
        e.preventDefault();
        console.log('entro a eleminar');
        axios({
            method: 'post',
            url: `http://localhost:9000/facturas/deleteF`,
            data: {
                idFactura: ident
            }
        }).then(res => {
            ToastsStore.error("Eliminado Correctamente!");
            this.listarfactura();
        });
    }

    search = event => {
        event.preventDefault();

        axios({
            method: 'post',     //put
            url: `http://localhost:9000/facturas/listaFCorreo`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                correo: event.target['inputBuscar'].value,
            }
        }).then(res => {
            const data = res.data;
            const facturas = data.listado;
            this.setState({ facturas });
        });
    }

    openModal(...factura) {

        this.setState({ factura });

    }


    handleSubmit = event => {

        event.preventDefault();
        axios({
            method: 'post',     //put
            url: `http://localhost:9000/facturas/updateF`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                FACT_ID_FACTURA: event.target['id_factura'].value,
                FACT_CODIGO: event.target['codigo_factura'].value,
                FACT_MONTO: event.target['monto_factura'].value,
                FACT_DESCUENTO: event.target['monto_descuento'].value,
                FACT_IMPUESTO: event.target['monto_impuesto'].value,
                FACT_TELEFONO: event.target['telefono_cliente'].value,
                FACT_CORREO: event.target['correo_cliente'].value,
                FACT_DIRECCION: event.target['direccion_cliente'].value,
                FACT_FECHA: event.target['fecha'].value,
                FACT_TIPO_PAGO: event.target['tipo_pago'].value,
                FACT_ESTADO: event.target['estado'].value,
                FACT_NOMBRE_CLIENTE: event.target['nombre_cliente'].value,
            }
        }).then(res => {

            ToastsStore.warning("Editado Correctamente!")
            this.listarfactura();
        });
    }

    componentDidMount() {
        this.listarfactura();
    }

    render() {
        return (
            <div id='container'>

                <div id='contenedorPrimario'>
                    <label htmlFor='inputBuscar'>Buscar Factura:</label>
                    <form onSubmit={this.search}>
                        <div className="input-group mb-3">

                            <input id='inputBuscar' type="text" className="form-control" placeholder="Buscar por Correo" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
                            </div>

                        </div>
                    </form>

                    <table className="table table-striped table-dark mt-5">
                        <thead>
                            <tr>

                                <th scope="col">Codigo</th>
                                <th scope="col">Telefono</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Tipo Pago</th>
                                <th scope="col">Nombre Cliente</th>
                                <th scope="col">Correo Cliente</th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                this.state.facturas.map((fact, i) => {
                                    return (
                                        <tr key={'tr' + i} scope="row">
                                            <td key={'cod' + i}>{fact.FACT_CODIGO}</td>
                                            <td key={'telef' + i}>{fact.FACT_TELEFONO}</td>
                                            <td key={'fh' + i}>{fact.FACT_MONTO}</td>
                                            <td key={'tp' + i}>{fact.FACT_TIPO_PAGO}</td>
                                            <td key={'cli' + i}>{fact.FACT_NOMBRE_CLIENTE}</td>
                                            <td key={'correo' + i}>{fact.FACT_CORREO}</td>
                                            <td key={'but_edit' + i}><button className="btn btn-warning  btn-editar" type="button" data-toggle="modal" data-target="#ModalEditFactura" onClick={ () => this.openModal(fact.FACT_ID_FACTURA, fact.FACT_CODIGO, fact.FACT_MONTO, fact.FACT_DESCUENTO, fact.FACT_IMPUESTO, fact.FACT_TELEFONO, fact.FACT_ID_CLIENTE, fact.FACT_CORREO, fact.FACT_DIRECCION, fact.FACT_FECHA, fact.FACT_TIPO_PAGO, fact.FACT_ESTADO, fact.FACT_NOMBRE_CLIENTE )}>Editar</button> </td>
                                            <td key={'but_elim' + i}><button className="btn btn-danger" id="id_produc" onClick={e => this.delete(e, fact.FACT_ID_FACTURA)} type="submit" >Eliminar</button> </td>
                                        </tr>

                                    );
                                })
                            }

                        </tbody>
                    </table>



                    <div className="modal fade" id="ModalEditFactura" tabIndex="-1" aria-labelledby="ModalEditFactura1" aria-hidden="true">
                        <div className="modal-dialog  modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModalEditFactura1">Modificar Factura</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div id="insertCliente">
                                        <form onSubmit={this.handleSubmit} >

                                            <div className="form-row">

                                                <input type='hidden' id='id_factura' name='id_factura'
                                                    defaultValue={this.state.factura[0]} />

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="codigo_factura ">Codigo Factura</label>
                                                    <input type="text" className="form-control" id="codigo_factura" placeholder="Codigo Factura"
                                                        defaultValue={this.state.factura[1]}></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="monto_factura">Monto Factura</label>
                                                    <input type="text" className="form-control" id="monto_factura" placeholder="Monto Factura"
                                                        defaultValue={this.state.factura[2]}></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="monto_descuento">Monto Descuento</label>
                                                    <input type="text" className="form-control" id="monto_descuento" placeholder="Monto Descuento"
                                                        defaultValue={this.state.factura[3]}></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="Monto_impuesto">Monto Impuesto</label>
                                                    <input type="text" className="form-control" id="monto_impuesto" placeholder="Monto Impuesto"
                                                        defaultValue={this.state.factura[4]}></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="telefono_cliente">Telefono Cliente</label>
                                                    <input type="text" className="form-control" id="telefono_cliente" placeholder="Telefono Cliente"
                                                        defaultValue={this.state.factura[5]}></input>
                                                </div>



                                                <input type='hidden' id='id_cliente' name='id_cliente' value=''
                                                    defaultValue={this.state.factura[6]} />


                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="correo_cliente">Correo_cliente</label>
                                                    <input type="text" className="form-control" id="correo_cliente" placeholder="Correo_cliente"
                                                        defaultValue={this.state.factura[7]}></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="direccion_cliente">Dirrecion_Cliente</label>
                                                    <input type="text" className="form-control" id="direccion_cliente" placeholder="Dirrecion_Cliente"
                                                        defaultValue={this.state.factura[8]}></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="fecha">Fecha</label>
                                                    <input type="date" className="form-control" id="fecha" placeholder="Fecha"
                                                        defaultValue={this.state.factura[9]}></input>
                                                </div>


                                                <div className="form-group col-md-4">
                                                    <select id="tipo_pago" class="form-control" defaultValue={this.state.factura[10]}>
                                                        <option selected>Efectivo</option>
                                                        <option>Tarjeta</option>
                                                    </select>
                                                </div>

                                                <input type='hidden' id='estado' name='estado' value='A'
                                                    defaultValue={this.state.factura[11]} />

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="nombre_cliente">Nombre Cliente</label>
                                                    <input type="text" className="form-control" id="nombre_cliente" placeholder="Nombre Cliente" defaultValue={this.state.factura[12]}></input>
                                                </div>


                                            </div>

                                            <div className="col-auto">
                                            <button type="submit" className="btn btn-editar btn-dark" >Editar</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                      
                                        <ToastsContainer store={ToastsStore} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }




}
export default Factura;