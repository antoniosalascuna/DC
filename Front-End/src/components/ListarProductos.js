import React from 'react';
import { useState, useEffect } from 'react';
import '../assets/css/Productos.css';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import updateProduct_service from './../services/services_products'

const ListarProductos = (props) => {

    const { productos } = props

    const [products, setProductos] = useState(
        {
            PRO_NOMBRE: '',
            PRO_STOCK: '' ,
            PRO_PRECIO: '',
            PRO_DESCRIPCION: '',
            PRO_ESTADO:'A' ,
            PRO_IMPUESTO:'',
            PRO_DOC_MAG: '',
            PRO_CODIGO_PRODUCTO:'',
            PRO_ID_PRODUCTO:''
        }
    )


    const openModal = (cod_prod, nombr_prod, prci_prod, descr_prod, estd_prod, stock_prod, imp_prod, doc_prod, id_prod) => {

        setProductos({
            PRO_NOMBRE: nombr_prod,
            PRO_STOCK: stock_prod,
            PRO_PRECIO: prci_prod,
            PRO_DESCRIPCION: descr_prod,
            PRO_ESTADO: estd_prod ,
            PRO_IMPUESTO: imp_prod,
            PRO_DOC_MAG: doc_prod ,
            PRO_CODIGO_PRODUCTO: cod_prod,
            PRO_ID_PRODUCTO: id_prod
        })

    }

    const handleChange = (event) => {

        const {name, value} = event.target

        setProductos({...products, [name]:value})
    }

    const handleSubmit = async () => {

        await updateProduct_service.updateProduct(products).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    }


    return (

        <div className="container">

            <table className="table table-striped table-dark mt-5">
                <thead>
                    <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Estado</th>

                    </tr>
                </thead>

                <tbody>
                    {
                        productos.map((pro, i) => {
                            return (
                                <tr key={'tr' + i} scope="row">
                                    <td key={'cod_pro' + i}>{pro.PRO_CODIGO_PRODUCTO}</td>
                                    <td key={'pro' + i}>{pro.PRO_NOMBRE}</td>
                                    <td key={'pre' + i}>{pro.PRO_PRECIO}</td>
                                    <td key={'descr' + i}>{pro.PRO_DESCRIPCION}</td>
                                    <td key={'est' + i}>{pro.PRO_ESTADO}</td>
                                    <td key={'but_edit' + i}><button className="btn btn-warning  btn-editar" type="button" data-toggle="modal" data-target="#ModalEditProducto"
                                        onClick={() => openModal(pro.PRO_CODIGO_PRODUCTO, pro.PRO_NOMBRE, pro.PRO_PRECIO, pro.PRO_DESCRIPCION, pro.PRO_ESTADO, pro.PRO_STOCK, pro.PRO_IMPUESTO, pro.PRO_DOC_MAG, pro.PRO_ID_PRODUCTO)}>Editar</button> </td>
                                    <td key={'but_elim' + i}><button className="btn btn-danger" id="id_produc" onClick={e => this.delete(e, pro.PRO_ID_PRODUCTO)} type="submit" >Eliminar</button> </td>
                                </tr>

                            );
                        })
                    }

                </tbody>

            </table>


            <div className="modal fade" id="ModalEditProducto" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editar el producto</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div id="insertCliente">
                                <form >

                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label className="sr-only" htmlFor="codigo_producto">Codigo Producto</label>
                                            <input type="text" className="form-control" id="codigo_producto" placeholder="Codigo Producto"
                                            onChange={handleChange} defaultValue={products.PRO_CODIGO_PRODUCTO} name="PRO_CODIGO_PRODUCTO"></input>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label className="sr-only" htmlFor="nombre">Nombre</label>
                                            <input type="text" className="form-control" id="nombre" placeholder="Nombre"
                                               onChange={handleChange} defaultValue= {products.PRO_NOMBRE} name="PRO_NOMBRE" ></input>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label className="sr-only" htmlFor="descripcion">Descripcion</label>
                                            <input type="text" className="form-control" id="descripcion" placeholder="Descripcion"
                                               onChange={handleChange} defaultValue={products.PRO_DESCRIPCION} name="PRO_DESCRIPCION" ></input>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label className="sr-only" htmlFor="precio">Precio</label>
                                            <input type="text" className="form-control" id="precio" placeholder="Precio"
                                               onChange={handleChange} defaultValue={products.PRO_PRECIO} name= "PRO_PRECIO"></input>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label className="sr-only" htmlFor="stock">Existencia</label>
                                            <input type="text" className="form-control" id="stock" placeholder="Existecias(En Stock)"
                                             onChange={handleChange}  defaultValue={products.PRO_STOCK} name="PRO_STOCK"></input>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label className="sr-only" htmlFor="Impuesto">Impuesto</label>
                                            <input type="text" className="form-control" id="impuesto" placeholder="Impuesto"
                                             onChange={handleChange} defaultValue={products.PRO_IMPUESTO} name="PRO_IMPUESTO"></input>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label className="sr-only" htmlFor="doc_mag">Doc_MAG</label>
                                            <input type="text" className="form-control" id="doc_mag" placeholder="# Documento Minist.Hac.Gan"
                                             onChange={handleChange}  defaultValue={products.PRO_DOC_MAG} name=" " ></input>
                                        </div>

                                        <input type='hidden' id='id' name='id' onChange={handleChange} defaultValue={products.PRO_ID_PRODUCTO} name="PRO_ID_PRODUCTO" />

                                        <input type='hidden' id='estado' name='estado' value='A' onChange={handleChange} defaultValue={products.PRO_ESTADO} name="PRO_ESTADO"/>

                                        <div className="form-group ">
                                            <button type="button" onClick={handleSubmit} className="btn btn-editar btn-dark" >Editar</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button"  className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}


/*
class ListarProductos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
        this.delete = this.delete.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    };

    delete = (e, ident) => {
        e.preventDefault();
        console.log('entro a eleminar');
        axios({
            method: 'post',
            url: `http://localhost:9000/productos/deleteP`,
            data: {
                idProducto: ident
            }
        }).then(res => {
            ToastsStore.error("Eliminado Correctamente!")
            this.props.listado();
        });
    }

    openModal(...products) {

        this.setState({ products });

    }

    handleSubmit = event => {

        event.preventDefault();
        console.log(event.target['id'].value);
        axios({
            method: 'post',     //put
            url: `http://localhost:9000/productos/updateP`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                PRO_ID_PRODUCTO: event.target['id'].value,
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
            ToastsStore.warning("Editado Correctamente!")
            this.props.listado();
        });
    }


    render() {
        return (
            <div className="container">


                <table className="table table-striped table-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Estado</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            this.props.productos.map((pro, i) => {
                                return (
                                    <tr key={'tr' + i} scope="row">
                                        <td key={'cod_pro' + i}>{pro.PRO_CODIGO_PRODUCTO}</td>
                                        <td key={'pro' + i}>{pro.PRO_NOMBRE}</td>
                                        <td key={'pre' + i}>{pro.PRO_PRECIO}</td>
                                        <td key={'descr' + i}>{pro.PRO_DESCRIPCION}</td>
                                        <td key={'est' + i}>{pro.PRO_ESTADO}</td>
                                        <td key={'but_edit' + i}><button className="btn btn-warning  btn-editar" type="button" data-toggle="modal" data-target="#ModalEditProducto"
                                         onClick={()=> this.openModal(pro.PRO_CODIGO_PRODUCTO, pro.PRO_NOMBRE, pro.PRO_PRECIO, pro.PRO_DESCRIPCION,pro.PRO_ESTADO, pro.PRO_STOCK, pro.PRO_IMPUESTO, pro.PRO_DOC_MAG, pro.PRO_ID_PRODUCTO)}>Editar</button> </td>
                                        <td key={'but_elim' + i}><button className="btn btn-danger" id="id_produc" onClick={e => this.delete(e, pro.PRO_ID_PRODUCTO)} type="submit" >Eliminar</button> </td>
                                    </tr>

                                );
                            })
                        }

                    </tbody>
                </table>

                <div className="modal fade" id="ModalEditProducto" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                <input type="text" className="form-control" id="codigo_producto" placeholder="Codigo Producto"
                                                 defaultValue={this.state.products[0]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="nombre">Nombre</label>
                                                <input type="text" className="form-control" id="nombre" placeholder="Nombre"
                                                 defaultValue={this.state.products[1]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="descripcion">Descripcion</label>
                                                <input type="text" className="form-control" id="descripcion" placeholder="Descripcion"
                                                defaultValue={this.state.products[3]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="precio">Precio</label>
                                                <input type="text" className="form-control" id="precio" placeholder="Precio"
                                                defaultValue={this.state.products[2]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="stock">Existencia</label>
                                                <input type="text" className="form-control" id="stock" placeholder="Existecias(En Stock)"
                                                defaultValue={this.state.products[5]}></input>
                                            </div>


                                          

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="Impuesto">Impuesto</label>
                                                <input type="text" className="form-control" id="impuesto" placeholder="Impuesto"
                                                defaultValue={this.state.products[6]}></input>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label className="sr-only" htmlFor="doc_mag">Doc_MAG</label>
                                                <input type="text" className="form-control" id="doc_mag" placeholder="# Documento Minist.Hac.Gan"
                                                defaultValue={this.state.products[7]}></input>
                                            </div>

                                            <input type='hidden' id='id' name='id' defaultValue={this.state.products[8]} />

                                            <input type='hidden' id='estado' name='estado' value='A'/>

                                            <div className="form-group ">
                                                <button type="submit" className="btn btn-editar btn-dark" >Editar</button>
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

}*/
export default ListarProductos;