import React from 'react';
import '../assets/css/Facturacion.css';
import axios from 'axios';

import ListarClientes from './ListarClientes';
import ListarProductosFactura from './ListarProductosFactura';
import DetalleFactura from './DetalleFactura';

var pruebaList=[];
var precio;
var precioTotal=0;
var impuesto;
var impuestoTotal;
var id=0;


class Facturacion extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            name:'Diego',
            clientes:[],
            cliente:[],
            products:[],
            productos:[],
            prueba:[],
            selectedOption: "0"
        };
        this.insertarFactura = this.insertarFactura.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.listaClientes = this.listaClientes.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.insertarDetalles= this.insertarDetalles.bind(this);
        this.listaproductos = this.listaproductos.bind(this);
        this.prueba= this.prueba.bind(this);
        
        this.search = this.search.bind(this);
        this.cambio = this.cambio.bind(this);

        
    }
    prueba(){
        this.state.prueba['uno']=2;
        console.log(this.state.prueba);
    }
    
    handleOptionChange = changeEvent => {
    this.setState({
        selectedOption: changeEvent.target.value
    });
    };


    listaproductos = () => {

        axios.get(`http://localhost:9000/productos/lista`).then(res => {
            const data = res.data;
            const products = data.listado;
            this.setState({ products });
        })
    }
    
    listaClientes() {
        axios.get(`http://localhost:9000/clientes/lista`).then(res => {
            const data = res.data;
            const clientes = data.listado;
            this.setState({ clientes });
            //console.log(JSON.stringify(this.state.clientes) );
        })
        
    }
    
    cambio(cliente){
        this.setState({cliente} );
        console.log('Cambio: ' +cliente[2]);
    }
    
    insertarFactura(event) {
        event.preventDefault();
        
        precio=0;
        impuesto=0;
        impuestoTotal=0;
        precioTotal=0;
        this.state.productos.forEach((val)=>{
            console.log(val.CANTIDAD);
            precio=val.CANTIDAD * val.PRO_PRECIO;
            impuesto=precio*(val.PRO_IMPUESTO/100);
            impuestoTotal+=impuesto;
            precioTotal+=precio+impuesto;
        })
        let data;
                
        if(event.target['nombre_cliente']){
            /*data ={
                FACT_ID_CLIENTE:event.target['nombre_cliente'].value,
                FACT_DESCUENTO: 0,
                FACT_IMPUESTO: impuestoTotal,
                FACT_MONTO: precioTotal,
                FACT_DETALLE: this.state.productos
    
            };*/

            axios({
            method: 'post',     //put
            url: `http://localhost:9000/facturas/insertarF2`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                FACT_ID_CLIENTE:event.target['nombre_cliente'].value,
                FACT_DESCUENTO: 0,
                FACT_IMPUESTO: impuestoTotal,
                FACT_MONTO: precioTotal,
                FACT_TIPO_PAGO: event.target['tipo_pago'].value,
                FACT_ESTADO:'A'
                //FACT_DETALLE: this.state.productos
            }
            }).then(res => {
                console.log(res);
                console.log(res.data);
                //id=res.data.id;
                this.insertarDetalles(res.data.id);
            });

        }else{
            /*data ={
                FACT_TELEFONO:event.target['telefono'].value,
                FACT_CORREO:event.target['correo'].value,
                FACT_DIRECCION:event.target['direccion'].value,
                FACT_NOMBRE_CLIENTE:event.target['nombre'].value,
                FACT_DESCUENTO: 0,
                FACT_IMPUESTO: impuestoTotal,
                FACT_MONTO: precioTotal,
                FACT_DETALLE: this.state.productos
            };*/
            axios({
            method: 'post',     //put
            url: `http://localhost:9000/facturas/insertarF2`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                FACT_TELEFONO:event.target['telefono'].value,
                FACT_CORREO:event.target['correo'].value,
                FACT_DIRECCION:event.target['direccion'].value,
                FACT_NOMBRE_CLIENTE:event.target['nombre'].value,
                FACT_DESCUENTO: 0,
                FACT_IMPUESTO: impuestoTotal,
                FACT_MONTO: precioTotal,
                FACT_TIPO_PAGO: event.target['tipo_pago'].value,
                FACT_ESTADO:'A'
                //FACT_DETALLE: this.state.productos
            }
            }).then(res => {
                console.log(res);
                console.log(res.data);
                //id=res.data.id;
                this.insertarDetalles(res.data.id);
            });
        }

        
        
        console.log(data);
    }

    insertarDetalles(identificacion){
        this.state.productos.forEach((val)=>{
            axios({
                method: 'post',     //put
                url: `http://localhost:9000/detFacturas/insertarDF`,
                //headers: {'Authorization': 'Bearer'+token}, 
                data: {
                    DETFAC_ID_FACTURA:identificacion,
                    DETFAC_ID_PRODUCTO:val.PRO_ID_PRODUCTO,
                    DETFAC_CANTIDAD:val.CANTIDAD,
                    DETFAC_ESTADO:"A",
                    DETFAC_DESCRIPCION:val.PRO_DESCRIPCION,
                    DETFAC_IMPUESTO:val.PRO_IMPUESTO,
                    DETFAC_DESCUENTO:0,
                    DETFAC_DOC_MAG:val.PRO_DOC_MAG
                }
                }).then(res => {
                    console.log(res);
                    console.log(res.data);
                    id=res.data.id;
                });
        })
    }
    
    componentDidMount() {
        this.listaClientes();
        this.listaproductos();
        pruebaList=[];
        precio=0;
        precioTotal=0;
        impuesto=0;
        impuestoTotal=0;
        id=0;
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
            url: `http://localhost:9000/productos/filtrado`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                texto: event.target['inputBuscar'].value,

            }
        }).then(res => {
            const data = res.data;
            const products = data.listado;
            this.setState({ products });
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

    handleSubmit2(event) {
        event.preventDefault();

        pruebaList.push({"PRO_ID_PRODUCTO":event.target['idProducto'].value,
                         "PRO_NOMBRE":event.target['nombre'].value,
                         "PRO_PRECIO":event.target['precio'].value,
                         "PRO_DESCRIPCION":event.target['descripcion'].value,
                         "PRO_IMPUESTO":event.target['impuesto'].value,
                         "PRO_DOC_MAG":event.target['documentoMAG'].value,
                         "CANTIDAD":event.target['cantidad'].value,
                         "PRO_CODIGO_PRODUCTO":event.target['codigoProd'].value
                        });
        this.setState({
            productos: pruebaList
        });
                        
        /*console.log('Prueba de list');
        console.log(pruebaList);
        
        console.log(JSON.stringify(this.state.products));*/
        
        /*console.log(event.target['idProducto'].value +" "+event.target['nombre'].value+" "+event.target['precio'].value+" "+
                   event.target['descripcion'].value +" "+event.target['impuesto'].value+" "+event.target['documentoMAG'].value+" "+
                   event.target['codigoProd'].value+" "  +event.target['cantidad'].value);*/

    }

    render() {
        const buttonOne = <div >
                                <label htmlFor="tipo_pago">Cliente</label>
                                <select id="nombre_cliente"  className="form-control">
                                    {
                                        this.state.clientes.map((cli, i) => {
                                            return (
                                                <option className="form-control" key={"cli" + i} value={cli.CLI_ID_CLIENTE}>
                                                    {cli.CLI_NOMBRE +' '+cli.CLI_APELLIDOS}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>;
        const buttonTwo = <div>
                                <label htmlFor="nombre">Nombre Cliente</label>
                                <input id="nombre" type="text" className="form-control" placeholder="nombre" 
                                aria-label="Recipient's username" aria-describedby="basic-addon2" /> 

                                <label htmlFor="telefono">Teléfono</label>
                                <input id="telefono" type="text" className="form-control" placeholder="Teléfono" 
                                aria-label="Recipient's username" aria-describedby="basic-addon2" /> 
                  
                                <label htmlFor="correo">Correo</label>
                                <input id="correo" type="text" className="form-control" placeholder="Correo" 
                                aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                
                                <label htmlFor="direccion">Direccion</label>
                                <input id="direccion" type="text" className="form-control" placeholder="Direccion" 
                                aria-label="Recipient's username" aria-describedby="basic-addon2" />
                
              
                          </div>;
        
        return (
            <div id='container_facturacion'>
                <div id='contenedorIz'>
                    
                    
                    <div>
                        <form onSubmit={this.insertarFactura}>
                        <div id="flex1">
                        <div id='radiosFact'>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="0"
                                    checked={this.state.selectedOption === "0"}
                                    onChange={this.handleOptionChange} 
                                    />
                                    Cliente Registrado
                                </label>
                            </div>
                    
                            <div className="radio">
                                <label>
                                    <input type="radio" value="1" 
                                    checked={this.state.selectedOption === "1"}
                                    onChange={this.handleOptionChange} 
                                    />
                                    Nuevo
                                </label>
                            </div>
                        </div>
                        <div id="botonEnviar"><button type="submit" className="btn btn-warning  btn-editar">Insertar factura</button></div>
                        </div>
                        {
                        this.state.selectedOption === "0"
                            ? buttonOne
                            : buttonTwo

                        }
                            <label htmlFor="tipo_pago">Tipo de pago</label>
                            <select id="tipo_pago"  className="form-control">
                                <option value='Efectivo'>Efectivo</option>
                                <option value='Cheque'>Cheque</option>
                                <option value='Tarjeta'>Tarjeta</option>
                            </select><br />
                            
                        </form>
                        
                    <form onSubmit={this.search}>
                    <br /><label htmlFor='inputBuscar'>Buscar producto:</label>
                        <div className="input-group mb-3">
                        
                            <input id='inputBuscar' type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
                            </div>
                        
                        </div>
                    </form>
                        
                        <ListarProductosFactura handleSub={this.handleSubmit2} productos={this.state.products}/>
                    
                    </div>
                    {/*<button onClick={this.prueba}>prueba array</button>*/}
                    
                </div>


                <div id='contenedorDe'>

                    <DetalleFactura prod={this.state.productos}/>

                </div>
                
                
            </div>
        );
    }
}

export default Facturacion;