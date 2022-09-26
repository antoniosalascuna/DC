import React from 'react';
import { useEffect, useState } from 'react';
import '../assets/css/Productos.css';
import ListarProductos from './ListarProductos';
import '../assets/css/Productos.css';
import { ToastsContainer, ToastsStore } from 'react-toasts';

import product_services from './../services/services_products'

const Productos = () => {


    const [product, setProducts] = useState([])
    
    const [newproduct, setNewProduct]= useState({
        
        PRO_NOMBRE: '',
        PRO_STOCK: '' ,
        PRO_PRECIO: '',
        PRO_DESCRIPCION: '',
        PRO_ESTADO:'A' ,
        PRO_IMPUESTO:'',
        PRO_DOC_MAG: '',
        PRO_CODIGO_PRODUCTO:'',
        
    })

    useEffect(() => {
        product_services.getProductoList().then(res => {
            const data = res.data;
            const products = data.listado;
            
            setProducts(products)

        }).catch(err => {
            console.log(err)
        })

       
    }, []);


   const handleOnChange = (event) => {

        const {name, value} = event.target
        
        setNewProduct({...newproduct, [name]:value})

    }

    const handleSubmit  = async (event) => {

       await product_services.insertProducto(newproduct).then(res => {
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
     

    }

    return (
        <div id='container'>

             <div id='contenedorPrimario'>
                <label htmlFor='inputBuscar'>Buscar producto:</label>
                <form>
                    <div className="input-group mb-3">

                        <input id='inputBuscar' type="text" className="form-control" placeholder="Buscar" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
                        </div>

                    </div>

                </form>
                <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
                    Insertar Producto
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
                                    <form onSubmit={handleSubmit}>

                                        <div className="form-row">

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="codigo_producto">Codigo Producto</label>
                                                <input name="PRO_CODIGO_PRODUCTO" type="text" className="form-control" id="codigo_producto" onChange={handleOnChange} placeholder="Codigo Producto"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="nombre">Nombre</label>
                                                <input name="PRO_NOMBRE"  type="text" className="form-control" id="nombre"  onChange={handleOnChange} placeholder="Nombre"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="descripcion">Descripcion</label>
                                                <input name="PRO_DESCRIPCION"  type="text" className="form-control" id="descripcion"  onChange={handleOnChange} placeholder="Descripcion"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="precio">Precio</label>
                                                <input name="PRO_PRECIO"  type="text" className="form-control" id="precio"  onChange={handleOnChange} placeholder="Precio"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="stock">Existencia</label>
                                                <input name="PRO_STOCK"  type="text" className="form-control" id="stock"  onChange={handleOnChange} placeholder="Existecias(En Stock)"></input>
                                            </div>


                                            <input name="estado"  type='hidden' id='estado' className='form-control' value='A' />

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="Impuesto">Impuesto</label>
                                                <input name="PRO_IMPUESTO"  type="text" className="form-control" id="impuesto"  onChange={handleOnChange} placeholder="Impuesto"></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="doc_mag">Doc_MAG</label>
                                                <input name="PRO_DOC_MAG"  type="text" className="form-control" id="doc_mag"  onChange={handleOnChange} placeholder="# Documento Minist.Hac.Gan"></input>
                                            </div>



                                            <div className="col-auto">
                                                <button type="submit" className="btn btn-editar btn-dark" >Insertar</button>
                                                <ToastsContainer store={ToastsStore} />
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
                <ListarProductos  productos={product} />
            </div> 

        </div>


    );
}
/*
class Productos extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            products: [],
            texto: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.listaproductos = this.listaproductos.bind(this);
        this.search = this.search.bind(this);
    }


    listaproductos = () => {

        axios.get(`http://localhost:9000/productos/lista`).then(res => {
            const data = res.data;
            const products = data.listado;
            this.setState({ products });
        })
    }


    componentDidMount() {
        this.listaproductos();
    }


    handleSubmit = event => {
        event.preventDefault();

        axios({
            method: 'post',     //put
            url: `http://localhost:9000/productos/insertarP`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                PRO_NOMBRE: event.target['nombre'].value,
                PRO_STOCK: event.target['stock'].value,
                PRO_PRECIO: event.target['precio'].value,
                PRO_DESCRIPCION: event.target['descripcion'].value,
                PRO_ESTADO: event.target['estado'].value,
                PRO_IMPUESTO: event.target['impuesto'].value,
                PRO_DOC_MAG: event.target['doc_mag'].value,
                PRO_CODIGO_PRODUCTO: event.target['codigo_producto'].value,
            }
        }).then(res => {

            ToastsStore.success("Insertado Correctamente!")

            this.listaproductos();

        });


    }


    search = event => {
        event.preventDefault();

        axios({
            method: 'post',     //put
            url: `http://localhost:9000/productos/filtrado`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                texto: event.target['texto'].value,

            }
        }).then(res => {
            const data = res.data;
            const products = data.listado;
            this.setState({ products });
        });
    }



    render() {

        return (
            <div id='container'>

                <div id='contenedorPrimario'>
                    <label htmlFor='inputBuscar'>Buscar producto:</label>
                    <form onSubmit={this.search}>
                        <div className="input-group mb-3">

                            <input id='inputBuscar' type="text" className="form-control" placeholder="Buscar" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buscar</button>
                            </div>

                        </div>

                    </form>
                    <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
                        Insertar Producto
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
                                        <form onSubmit={this.handleSubmit} >

                                            <div className="form-row">

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="codigo_producto">Codigo Producto</label>
                                                    <input type="text" className="form-control" id="codigo_producto" placeholder="Codigo Producto"></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="nombre">Nombre</label>
                                                    <input type="text" className="form-control" id="nombre" placeholder="Nombre"></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="descripcion">Descripcion</label>
                                                    <input type="text" className="form-control" id="descripcion" placeholder="Descripcion"></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="precio">Precio</label>
                                                    <input type="text" className="form-control" id="precio" placeholder="Precio"></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="stock">Existencia</label>
                                                    <input type="text" className="form-control" id="stock" placeholder="Existecias(En Stock)"></input>
                                                </div>


                                                <input type='hidden' id='estado' name='estado' value='A' />

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="Impuesto">Impuesto</label>
                                                    <input type="text" className="form-control" id="impuesto" placeholder="Impuesto"></input>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label className="sr-only" htmlFor="doc_mag">Doc_MAG</label>
                                                    <input type="text" className="form-control" id="doc_mag" placeholder="# Documento Minist.Hac.Gan"></input>
                                                </div>



                                                <div className="col-auto">
                                                    <button type="submit" className="btn btn-editar btn-dark" >Insertar</button>
                                                    <ToastsContainer store={ToastsStore} />
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
                    <ListarProductos listado={this.listaproductos} productos={this.state.products} />
                </div>

            </div>






        );
    }
}*/

export default Productos;