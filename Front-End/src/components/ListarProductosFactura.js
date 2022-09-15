import React from 'react';
import '../assets/css/ListarProductosFactura.css';
import axios from 'axios';

class ListarProductosFactura extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);

    };


    openModal(...products) {

        this.setState({ products });

    }
    
    handleSubmit(event) {
        event.preventDefault();
        /*this.setState({
            submit: this.state.input
        });*/
        //console.log(event.target['numeroAcuerdo'].value);
        this.setState({ products: [...this.state.products, ...[1,2,3] ] }) //another array
        

    }

    


    render() {
        return (
            <div className="container"><br />
                <div className="MainFlexContainer" >
                    <div className="flexcontainer">Nombre</div> 
                    <div className="flexcontainer">Precio</div> 
                    <div className="flexcontainer">Cantidad</div> 
                    <div className="flexcontainer">Agregar</div>
                </div>
                
                    {

                            this.props.productos.map((pro, i) => {
                                return (
                                    <form key={'fr' + i+1} onSubmit={this.props.handleSub}>
                                    <div key={'mn' + i+1} className="MainFlexContainer" >
                                        
                                        <input key={'pr' + i+1} type="hidden" name="idProducto" defaultValue={pro.PRO_ID_PRODUCTO}></input>
                                        <input key={'nom' + i+1} type="hidden" name="nombre" defaultValue={pro.PRO_NOMBRE}></input>
                                        <input key={'pre' + i+1} type="hidden" name="precio" defaultValue={pro.PRO_PRECIO}></input>
                                        <input key={'des' + i+1} type="hidden" name="descripcion" defaultValue={pro.PRO_DESCRIPCION}></input>
                                        <input key={'imp' + i+1} type="hidden" name="impuesto" defaultValue={pro.PRO_IMPUESTO}></input>
                                        <input key={'doc' + i+1} type="hidden" name="documentoMAG" defaultValue={pro.PRO_DOC_MAG}></input>
                                        <input key={'cod' + i+1} type="hidden" name="codigoProd" defaultValue={pro.PRO_CODIGO_PRODUCTO}></input>

                                        <div key={'div1' + i+1} className="flexcontainer" key={'pro' + i}>{pro.PRO_NOMBRE}</div> 
                                        <div key={'div2' + i+1} className="flexcontainer" key={'pre' + i}>{pro.PRO_PRECIO}</div> 
                                        <div key={'div3' + i+1} className="flexcontainer" key={'cant' + i}>
                                            <input key={'cant' + i+1} type="text" name="cantidad" className="form-control"></input></div> 
                                        <div  className="flexcontainer" key={'btn_Agregar' + i+1}>
                                            <button className="btn btn-warning  btn-editar" type="submit" data-toggle="modal" data-target="#ModalEditProducto">
                                                Agregar
                                            </button> 
                                        </div>
                                        
                                    </div>
                                    </form>
                                );
                            })
                    }

            </div>

        )
    }

}
export default ListarProductosFactura;